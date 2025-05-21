const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Simple in-memory cache
const cache = {
  data: {},
  timestamps: {},
  // Cache duration in milliseconds (1 hour)
  CACHE_DURATION: 60 * 60 * 1000,
  
  // Get cached data if it exists and isn't expired
  get(key) {
    const timestamp = this.timestamps[key];
    if (timestamp && Date.now() - timestamp < this.CACHE_DURATION) {
      console.log(`Using cached data for: ${key}`);
      return this.data[key];
    }
    console.log(`No valid cache for: ${key}`);
    return null;
  },
  
  // Store data in cache with current timestamp
  set(key, data) {
    console.log(`Caching data for: ${key}`);
    this.data[key] = data;
    this.timestamps[key] = Date.now();
  },
  
  // Get cache metadata for the given key
  getInfo(key) {
    const timestamp = this.timestamps[key];
    if (!timestamp) return 'Not cached';
    
    const age = Date.now() - timestamp;
    const expiresIn = this.CACHE_DURATION - age;
    
    if (expiresIn <= 0) return 'Cache expired';
    
    return {
      age: `${Math.round(age / 1000 / 60)} minutes old`,
      expiresIn: `Expires in ${Math.round(expiresIn / 1000 / 60)} minutes`,
      size: this.data[key] ? this.data[key].length : 0
    };
  }
};

// Enable CORS for your website's domain
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],  // Your website's domains
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Cache info endpoint
app.get('/api/cache-info', (req, res) => {
  const info = {};
  
  // Get all cache keys
  Object.keys(cache.timestamps).forEach(key => {
    info[key] = cache.getInfo(key);
  });
  
  res.status(200).json({
    cacheEntries: Object.keys(cache.timestamps).length,
    cacheDuration: `${cache.CACHE_DURATION / 1000 / 60} minutes`,
    entries: info
  });
});

// Clear cache endpoint (admin only)
app.get('/api/clear-cache', (req, res) => {
  // In a production environment, you'd want to add authentication here
  const count = Object.keys(cache.timestamps).length;
  cache.data = {};
  cache.timestamps = {};
  
  res.status(200).json({
    status: 'success',
    message: `Cleared ${count} cache entries`
  });
});

// Utility: Filter out events that start before the current month
function filterICalEvents(icalData) {
  const startOfCurrentMonth = new Date();
  startOfCurrentMonth.setDate(1);
  startOfCurrentMonth.setHours(0, 0, 0, 0);

  // Regex to capture each VEVENT block (including trailing newline if present)
  const veventRegex = /BEGIN:VEVENT[\s\S]*?END:VEVENT\r?\n?/g;

  return icalData.replace(veventRegex, (eventBlock) => {
    const dtstartMatch = eventBlock.match(/DTSTART[^:]*:(\d{8}(T\d{6}Z?)?)/);
    if (dtstartMatch) {
      const dt = dtstartMatch[1]; // e.g. 20250701 or 20250701T120000Z
      const year = parseInt(dt.substring(0, 4), 10);
      const month = parseInt(dt.substring(4, 6), 10) - 1; // JS months are 0-based
      const day = parseInt(dt.substring(6, 8), 10);
      const eventDate = new Date(Date.UTC(year, month, day));

      // Keep events that start on/after the 1st of the current month
      if (eventDate < startOfCurrentMonth) {
        return '';
      }
    }
    return eventBlock; // Keep if no DTSTART found or date is valid
  });
}

// Endpoint to fetch iCal data
app.get('/api/ical', async (req, res) => {
  const { url, forceRefresh } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    // Try to get from cache first (unless force refresh requested)
    const shouldUseCache = forceRefresh !== 'true';
    const cachedData = shouldUseCache ? cache.get(url) : null;
    
    if (cachedData) {
      // Ensure cached data is also filtered (in case it was cached before filter was introduced)
      const cleanedData = filterICalEvents(cachedData);
      if (cleanedData !== cachedData) {
        // Update cache with cleaned data
        cache.set(url, cleanedData);
      }
      // Return cached (and cleaned) data
      res.set('Content-Type', 'text/calendar');
      res.set('X-Cache', 'HIT');
      res.set('X-Cache-Info', JSON.stringify(cache.getInfo(url)));
      res.send(cleanedData);
      return;
    }
    
    // Cache miss or forced refresh, fetch fresh data
    console.log(`Fetching iCal data from: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch iCal data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.text();
    
    // Filter out bookings before current month
    const filteredData = filterICalEvents(data);

    // Cache the response
    cache.set(url, filteredData);
    
    // Send the iCal data as plain text
    res.set('Content-Type', 'text/calendar');
    res.set('X-Cache', 'MISS');
    res.send(filteredData);
    
    console.log(`Successfully fetched and returned iCal data from: ${url}`);
  } catch (error) {
    console.error('Error fetching iCal data:', error);
    res.status(500).json({ error: 'Failed to fetch iCal data', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`iCal proxy server running on http://localhost:${PORT}`);
}); 
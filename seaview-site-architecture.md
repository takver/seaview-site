# Seaview Site Calendar System Architecture

## Overview

The Seaview site uses a custom availability calendar to display booking information from multiple sources (Booking.com and Airbnb). The system consists of two main components:

1. **Main Website** (a Vite React application running on port 3000)
2. **iCal Proxy Server** (a Node.js Express server running on port 3001)

## Architecture Diagram

```
+------------------+      +-----------------+      +------------------+
| Website Frontend |----->| iCal Proxy      |----->| External iCal    |
| (Port 3000)      |<-----| Server          |<-----| Sources          |
|                  |      | (Port 3001)     |      | (Booking/Airbnb) |
+------------------+      +-----------------+      +------------------+
```

## Components

### 1. Website Frontend (Port 3000)

- **Technology**: Vite + React + TypeScript
- **Location**: `/Users/mleventopoulos/cursordemo/seaview-site/website-lovable-shift/`
- **Start Command**: `cd website-lovable-shift && npm run dev -- --port 3000`
- **Key Files**:
  - `src/components/AvailabilityCalendar.tsx`: The main calendar component
  - `src/utils/calendar.ts`: Logic for fetching and processing booking data
  - `src/config/icalConfig.ts`: Configuration for iCal sources

### 2. iCal Proxy Server (Port 3001)

- **Technology**: Node.js + Express
- **Location**: `/Users/mleventopoulos/cursordemo/seaview-site/ical-proxy-server/`
- **Start Command**: `cd ical-proxy-server && node server.js`
- **Key File**: `server.js`: The proxy server implementation
- **Purpose**: To proxy iCal requests to external sources to avoid CORS issues and provide caching

## Data Flow

1. When a user views the calendar, the `AvailabilityCalendar` component calls `fetchCalendarData()` in `utils/calendar.ts`
2. The `fetchCalendarData()` function calls `fetchAllCalendars()` which fetches data from all sources via the proxy server
3. The proxy server receives the request at `http://localhost:3001/api/ical?url=...`
4. The proxy server checks its cache and either returns cached data or fetches fresh data from the external source
5. The fetched iCal data is parsed into booking events by the `parseICalData()` function
6. The `mergeOverlappingBookings()` function combines overlapping or consecutive bookings
7. The calendar component displays the bookings with the tube-style visualization

## Cache System

- **Client-side Caching**: The website maintains a 5-minute cache to reduce API calls
- **Server-side Caching**: The proxy server maintains a 1-hour cache to reduce external API calls
- **Force Refresh**: Passing `forceRefresh=true` bypasses the cache and fetches fresh data

## Issues Encountered

1. **Port Confusion**: We identified confusion between ports 3000, 3001, and 8080
   - Port 3000: Website frontend (Vite dev server)
   - Port 3001: iCal Proxy server
   - Port 8080: Another instance of the website frontend

2. **Path Issues**: There was confusion about the relative paths between components
   - From website-lovable-shift directory, the proxy server is at `../ical-proxy-server`
   - From seaview-site directory, the proxy server is at `./ical-proxy-server`

3. **Data Issues**: Bookings across month boundaries (like May-June) were not correctly displayed
   - This was fixed by improving the date comparison logic in the date utility functions

## How to Start the System

1. **Start the Proxy Server**:
   ```bash
   cd /Users/mleventopoulos/cursordemo/seaview-site/ical-proxy-server
   node server.js
   ```

2. **Start the Website**:
   ```bash
   cd /Users/mleventopoulos/cursordemo/seaview-site/website-lovable-shift
   npm run dev -- --port 3000
   ```

3. **Access the Website**: Open http://localhost:3000 in a browser

## Configuration of iCal Sources

The calendar is configured to pull data from two external sources:

```typescript
// From icalConfig.ts
export const icalSources: ICalSource[] = [
  {
    name: "Booking.com",
    url: "https://ical.booking.com/v1/export?t=8e18c708-f533-4e73-b9d2-a7be35ca1899"
  },
  {
    name: "Airbnb",
    url: "https://www.airbnb.com/calendar/ical/908766266127651509.ics?s=b886adc0ae4b9ad7df1faf690af8f5d6"
  }
];
```

## Troubleshooting

1. **Proxy Server Not Running**: 
   - Check if the proxy server is running with `curl -I http://localhost:3001/health`
   - If not running, start it with `cd ical-proxy-server && node server.js`

2. **Calendar Not Displaying Correct Bookings**:
   - Clear cache by adding `?forceRefresh=true` to proxy requests
   - Check browser console for errors
   - Verify that dates are being properly compared (normalizing time to midnight)

3. **CORS Issues**:
   - The proxy server must be configured to accept requests from the website's origin
   - Check that the website is making requests to the correct proxy URL 
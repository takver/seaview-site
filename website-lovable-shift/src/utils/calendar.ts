import { icalSources, ICalSource } from '@/config/icalConfig';
import { addDays, format } from 'date-fns';

export interface BookingEvent {
  start: Date;
  end: Date;
  summary?: string;
  source: string;
}

export interface DayAvailability {
  date: Date;
  isAvailable: boolean;
  isCheckIn: boolean;
  isCheckOut: boolean;
}

// URL for our proxy server
const PROXY_SERVER_URL = 'http://localhost:3001/api/ical';

/**
 * Fetches iCal data from all sources
 */
export async function fetchAllCalendars(forceRefresh: boolean = false): Promise<BookingEvent[]> {
  try {
    console.log('Starting to fetch calendars from sources:', icalSources);

    // Fetch calendars from every source in parallel
    const results = await Promise.all(
      icalSources.map((source) => fetchCalendar(source, forceRefresh))
    );

    // Flatten the result arrays into a single array
    let allEvents: BookingEvent[] = results.flat();

    console.log(`Fetched ${allEvents.length} total events from all calendars.`);

    // Merge overlapping or consecutive bookings to simplify the calendar
    allEvents = mergeOverlappingBookings(allEvents);

    // Log merged events for debugging
    allEvents.forEach((event) => {
      console.log(
        `Event: ${format(event.start, 'yyyy-MM-dd')} → ${format(
          event.end,
          'yyyy-MM-dd'
        )} (${event.source}) ${event.summary ?? ''}`
      );
    });

    return allEvents;
  } catch (error) {
    console.error('Error in fetchAllCalendars:', error);
    return [];
  }
}

/**
 * Fetches an iCal file from a URL via the proxy server and parses the events
 */
async function fetchCalendar(source: ICalSource, forceRefresh: boolean = false): Promise<BookingEvent[]> {
  try {
    console.log(`Fetching calendar from ${source.name} via proxy server`);
    
    // Encode the source URL to be used as a query parameter
    const encodedUrl = encodeURIComponent(source.url);
    const proxyUrl = `${PROXY_SERVER_URL}?url=${encodedUrl}${forceRefresh ? '&forceRefresh=true' : ''}`;
    
    console.log(`Using proxy URL: ${proxyUrl}`);
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar: ${response.status}`);
    }
    
    // Log cache status for debugging
    const cacheStatus = response.headers.get('X-Cache');
    const cacheInfo = response.headers.get('X-Cache-Info');
    console.log(`Cache status for ${source.name}: ${cacheStatus || 'unknown'}`);
    if (cacheInfo) {
      try {
        console.log(`Cache info: ${cacheInfo}`);
      } catch (e) {
        console.log(`Cache info (raw): ${cacheInfo}`);
      }
    }
    
    const data = await response.text();
    console.log(`Successfully fetched calendar data from ${source.name}, data length: ${data.length}`);
    
    if (data.length < 50) {
      console.log("Warning: Calendar data appears to be too short or empty");
      console.log("Data:", data);
      return [];
    }
    
    const events = parseICalData(data, source.name);
    console.log(`Parsed ${events.length} events from ${source.name}`);
    return events;
  } catch (error) {
    console.error(`Error fetching calendar from ${source.name}:`, error);
    return [];
  }
}

/**
 * Parses iCal data to extract booking events
 */
function parseICalData(icalData: string, sourceName: string): BookingEvent[] {
  const events: BookingEvent[] = [];
  
  // Split by events
  const eventStrings = icalData.split('BEGIN:VEVENT');
  
  // Skip the first element (header)
  eventStrings.slice(1).forEach(eventString => {
    try {
      // Extract start and end dates
      const dtstart = eventString.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/)?.[1];
      const dtend = eventString.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/)?.[1];
      const summary = eventString.match(/SUMMARY:([^\n]+)/)?.[1];
      
      if (dtstart && dtend) {
        // Parse dates (YYYYMMDD format)
        const startDate = parseICalDate(dtstart);
        // In iCal, the end date is exclusive, so subtract one day
        const endDate = addDays(parseICalDate(dtend), -1);
        
        // Debug date parsing
        console.log(`Parsed iCal date range: ${dtstart} -> ${format(startDate, 'yyyy-MM-dd')}, ${dtend} -> ${format(endDate, 'yyyy-MM-dd')}`);
        
        events.push({
          start: startDate,
          end: endDate,
          summary,
          source: sourceName
        });
      }
    } catch (error) {
      console.error('Error parsing event:', error);
    }
  });
  
  return events;
}

/**
 * Parses a date string in YYYYMMDD format
 */
function parseICalDate(dateStr: string): Date {
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1; // JavaScript months are 0-based
  const day = parseInt(dateStr.substring(6, 8));
  return new Date(year, month, day);
}

/**
 * Determines if a date is booked in any of the booking events
 */
export function isDateBooked(date: Date, bookings: BookingEvent[]): boolean {
  // Create a new date with time set to midnight to ensure reliable comparison
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  for (const booking of bookings) {
    // Create date objects with time set to midnight for reliable comparison
    const bookingStart = new Date(booking.start.getFullYear(), booking.start.getMonth(), booking.start.getDate());
    const bookingEnd = new Date(booking.end.getFullYear(), booking.end.getMonth(), booking.end.getDate());
    
    // Check if the date falls within or at the boundaries of the booking range
    if (targetDate.getTime() >= bookingStart.getTime() && targetDate.getTime() <= bookingEnd.getTime()) {
      return true;
    }
  }
  return false;
}

/**
 * Determines if a date is a check-in day
 */
export function isCheckInDay(date: Date, bookings: BookingEvent[]): boolean {
  // Create a new date with time set to midnight to ensure reliable comparison
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  for (const booking of bookings) {
    // Create date objects with time set to midnight
    const bookingStart = new Date(booking.start.getFullYear(), booking.start.getMonth(), booking.start.getDate());
    
    // Use exact date comparison for check-in days
    if (targetDate.getTime() === bookingStart.getTime()) {
      return true;
    }
  }
  return false;
}

/**
 * Determines if a date is a check-out day
 */
export function isCheckOutDay(date: Date, bookings: BookingEvent[]): boolean {
  // Create a new date with time set to midnight to ensure reliable comparison
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  for (const booking of bookings) {
    // Create date objects with time set to midnight
    const bookingEnd = new Date(booking.end.getFullYear(), booking.end.getMonth(), booking.end.getDate());
    
    // Use exact date comparison for check-out days
    if (targetDate.getTime() === bookingEnd.getTime()) {
      return true;
    }
  }
  return false;
}

/**
 * Gets availability status for a range of dates
 */
export function getAvailabilityForDateRange(
  startDate: Date, 
  endDate: Date, 
  bookings: BookingEvent[]
): DayAvailability[] {
  const availability: DayAvailability[] = [];
  let currentDate = startDate;
  
  while (currentDate <= endDate) {
    const isBooked = isDateBooked(currentDate, bookings);
    const isCheckIn = isCheckInDay(currentDate, bookings);
    const isCheckOut = isCheckOutDay(currentDate, bookings);
    
    availability.push({
      date: new Date(currentDate.getTime()),
      isAvailable: !isBooked,
      isCheckIn,
      isCheckOut
    });
    
    currentDate = addDays(currentDate, 1);
  }
  
  return availability;
}

/**
 * Formats a date range for display
 */
export function formatDateRange(start: Date, end: Date): string {
  return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
}

/**
 * Merges overlapping and consecutive booking events
 * This combines bookings that overlap or are directly adjacent (end date of one = start date of another)
 */
export function mergeOverlappingBookings(bookings: BookingEvent[]): BookingEvent[] {
  if (bookings.length <= 1) return bookings;
  
  console.log("MERGING OVERLAPPING BOOKINGS...");
  console.log(`Initial bookings count: ${bookings.length}`);
  
  // Debug: List all input bookings
  bookings.forEach((booking, i) => {
    console.log(`Input booking ${i+1}: ${format(booking.start, 'yyyy-MM-dd')} to ${format(booking.end, 'yyyy-MM-dd')} (${booking.source})`);
  });
  
  // Sort bookings by start date
  const sortedBookings = [...bookings].sort((a, b) => a.start.getTime() - b.start.getTime());
  const mergedBookings: BookingEvent[] = [];
  
  let currentBooking = sortedBookings[0];
  
  for (let i = 1; i < sortedBookings.length; i++) {
    const nextBooking = sortedBookings[i];
    
    // Check if bookings overlap or are consecutive
    // Two bookings overlap if next booking starts before or on the day after current booking ends
    const nextStartsBeforeOrOnDayAfterCurrentEnds = nextBooking.start <= addDays(currentBooking.end, 1);
    
    console.log(`Comparing: ${format(currentBooking.start, 'yyyy-MM-dd')}-${format(currentBooking.end, 'yyyy-MM-dd')} with ${format(nextBooking.start, 'yyyy-MM-dd')}-${format(nextBooking.end, 'yyyy-MM-dd')}`);
    console.log(`Overlap check: ${nextStartsBeforeOrOnDayAfterCurrentEnds}`);
    
    if (nextStartsBeforeOrOnDayAfterCurrentEnds) {
      // Merge the bookings - take earlier start date and later end date
      const oldStart = new Date(currentBooking.start.getTime());
      const oldEnd = new Date(currentBooking.end.getTime());
      
      currentBooking = {
        start: new Date(Math.min(currentBooking.start.getTime(), nextBooking.start.getTime())),
        end: new Date(Math.max(currentBooking.end.getTime(), nextBooking.end.getTime())),
        summary: "Booking (Not available)",
        source: `${currentBooking.source}+${nextBooking.source}`
      };
      
      console.log(`Merged: ${format(oldStart, 'yyyy-MM-dd')}-${format(oldEnd, 'yyyy-MM-dd')} + ${format(nextBooking.start, 'yyyy-MM-dd')}-${format(nextBooking.end, 'yyyy-MM-dd')} = ${format(currentBooking.start, 'yyyy-MM-dd')}-${format(currentBooking.end, 'yyyy-MM-dd')}`);
    } else {
      // No overlap, add the current booking to results and move to next
      mergedBookings.push(currentBooking);
      console.log(`No overlap, adding: ${format(currentBooking.start, 'yyyy-MM-dd')}-${format(currentBooking.end, 'yyyy-MM-dd')}`);
      currentBooking = nextBooking;
    }
  }
  
  // Don't forget to add the last booking
  mergedBookings.push(currentBooking);
  console.log(`Adding last booking: ${format(currentBooking.start, 'yyyy-MM-dd')}-${format(currentBooking.end, 'yyyy-MM-dd')}`);
  
  // Debug: List all output bookings
  console.log(`Final merged bookings count: ${mergedBookings.length}`);
  mergedBookings.forEach((booking, i) => {
    console.log(`Output booking ${i+1}: ${format(booking.start, 'yyyy-MM-dd')} to ${format(booking.end, 'yyyy-MM-dd')} (${booking.source})`);
  });
  
  console.log(`Merged ${bookings.length} bookings into ${mergedBookings.length} non-overlapping bookings`);
  return mergedBookings;
}


import { icalSources, ICalSource } from '@/config/icalConfig';
import { addDays, format, isSameDay, parseISO, startOfToday } from 'date-fns';

export interface BookingEvent {
  start: Date;
  end: Date;
  summary?: string;
  source: string;
}

export interface DayAvailability {
  date: Date;
  isAvailable: boolean;
  isCheckInOut: boolean;
}

/**
 * Fetches iCal data from all sources
 */
export async function fetchAllCalendars(): Promise<BookingEvent[]> {
  try {
    const promises = icalSources.map(source => fetchCalendar(source));
    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error('Error fetching calendars:', error);
    return [];
  }
}

/**
 * Fetches an iCal file from a URL and parses the events
 */
async function fetchCalendar(source: ICalSource): Promise<BookingEvent[]> {
  try {
    const response = await fetch(source.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar: ${response.status}`);
    }
    const data = await response.text();
    return parseICalData(data, source.name);
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
  return bookings.some(booking => 
    (date >= booking.start && date <= booking.end)
  );
}

/**
 * Determines if a date is a check-in or check-out day
 */
export function isCheckInOutDay(date: Date, bookings: BookingEvent[]): boolean {
  return bookings.some(booking => 
    isSameDay(date, booking.start) || isSameDay(date, booking.end)
  );
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
    const isCheckInOut = isCheckInOutDay(currentDate, bookings);
    
    availability.push({
      date: new Date(currentDate),
      isAvailable: !isBooked,
      isCheckInOut: isCheckInOut
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

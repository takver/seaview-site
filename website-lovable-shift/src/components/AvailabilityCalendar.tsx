import React, { useEffect, useState, useRef } from 'react';
import { BookingEvent, fetchAllCalendars, isCheckInDay, isCheckOutDay, isDateBooked } from '@/utils/calendar';
import { addMonths, format, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addDays, subDays, getDay, isWithinInterval } from 'date-fns';
import { cn } from '@/lib/utils';

interface AvailabilityCalendarProps {
  className?: string;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ className }) => {
  const [bookings, setBookings] = useState<BookingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  // Add a counter to force re-renders when needed
  const [renderCounter, setRenderCounter] = useState(0);
  
  // Function to force a redraw
  const forceRedraw = () => {
    setRenderCounter(prev => prev + 1);
  };
  
  // Calculate date boundaries
  const today = new Date();
  const currentMonth = startOfMonth(today);
  const maxMonth = addMonths(currentMonth, 6); // 6 months in the future
  
  // State for current display month
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  
  // How many months to calculate (for scrolling)
  const numberOfMonthsToShow = 6;
  
  // Calculate the displayed months as array
  const displayedMonths = [];
  for (let i = 0; i < numberOfMonthsToShow; i++) {
    displayedMonths.push(addMonths(displayMonth, i));
  }
  
  // Ref for the scrollable calendar container
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  
  // Navigation handler for the calendar
  const handleMonthChange = (newMonth: Date) => {
    // Only allow navigation between current month and 6 months in the future
    if (newMonth >= currentMonth && addMonths(newMonth, numberOfMonthsToShow - 1) <= maxMonth) {
      setDisplayMonth(newMonth);
      
      // Scroll to top when changing months
      if (calendarContainerRef.current) {
        calendarContainerRef.current.scrollTop = 0;
      }
    }
  };
  
  // Cache for booking data
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Function to fetch calendar data
  const fetchCalendarData = async (force = false) => {
    // If data was fetched recently and not forced, use cached data
    const now = Date.now();
    if (!force && lastFetchTime > 0 && now - lastFetchTime < CACHE_DURATION) {
      console.log("Using cached calendar data");
      return;
    }
    
    try {
      setIsLoading(true);
      const events = await fetchAllCalendars(force);
      console.log("Fetched booking events:", events);
      
      // Debug info about displayed months
      const startDate = displayMonth;
      const endDate = endOfMonth(addMonths(displayMonth, numberOfMonthsToShow - 1));
      
      // Filter for events in the displayed months
      const relevantEvents = events.filter(event => 
        (event.start <= endDate && event.end >= startDate)
      );
      
      // Create debug info
      let info = `Current display: ${format(displayMonth, 'MMMM yyyy')} - ${format(addMonths(displayMonth, numberOfMonthsToShow - 1), 'MMMM yyyy')}\n`;
      info += `Total events: ${events.length}\n`;
      info += `Relevant events: ${relevantEvents.length}\n`;
      info += `Cache duration: ${CACHE_DURATION / 1000 / 60} minutes\n`;
      info += `Last fetched: ${lastFetchTime ? new Date(lastFetchTime).toLocaleTimeString() : 'Never'}\n\n`;
      
      // List all events for debugging
      info += "All booking events:\n";
      events.forEach((event, i) => {
        info += `${i+1}. ${event.source}: ${format(event.start, 'yyyy-MM-dd')} to ${format(event.end, 'yyyy-MM-dd')} - ${event.summary || 'No summary'}\n`;
      });
      
      setDebugInfo(info);
      setBookings(events);
      setLastFetchTime(now);
      setError(null);
      // Force a redraw after data is loaded
      forceRedraw();
    } catch (err) {
      setError('Failed to load availability data');
      console.error('Error fetching calendar data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Only fetch data when the component mounts
  useEffect(() => {
    fetchCalendarData(true);
    
    // Debug check for June 1 and 2, 2025
    const june1 = new Date(2025, 5, 1);
    const june2 = new Date(2025, 5, 2);
    
    // Set up a timeout to check booking status after data is loaded
    setTimeout(() => {
      console.log("DEBUGGING JUNE 1-2 BOOKINGS:");
      console.log(`June 1, 2025 is booked: ${isDateBooked(june1, bookings)}`);
      console.log(`June 2, 2025 is booked: ${isDateBooked(june2, bookings)}`);
      console.log("Bookings that should include June 1-2:");
      bookings.forEach(booking => {
        if (
          (booking.start <= june1 && booking.end >= june1) ||
          (booking.start <= june2 && booking.end >= june2)
        ) {
          console.log(`- ${format(booking.start, 'yyyy-MM-dd')} to ${format(booking.end, 'yyyy-MM-dd')} (${booking.source})`);
        }
      });
    }, 2000); // Give it 2 seconds to load data
    
    // Set up a user activity listener for smart refreshing
    let userActivityTimeout: number | null = null;
    let lastUserActivity = Date.now();
    let activityDebounceTimeout: number | null = null;
    
    const handleUserActivity = () => {
      // Debounce activity events to prevent excessive handling
      if (activityDebounceTimeout) {
        window.clearTimeout(activityDebounceTimeout);
      }
      
      activityDebounceTimeout = window.setTimeout(() => {
        const now = Date.now();
        lastUserActivity = now;
        
        // Only refresh if it's been more than the cache duration since last fetch
        if (now - lastFetchTime > CACHE_DURATION) {
          console.log("Cache expired, refreshing data");
          fetchCalendarData(false); // Don't force refresh, use cache if available
        }
        
        // Clear any existing timeout and set a new one
        if (userActivityTimeout) {
          window.clearTimeout(userActivityTimeout);
        }
        
        // Check again after cache duration
        userActivityTimeout = window.setTimeout(() => {
          // Only fetch if user was active recently (within last 3 minutes)
          if (Date.now() - lastUserActivity < 3 * 60 * 1000) {
            console.log("User was recently active, refreshing data");
            fetchCalendarData(false); // Don't force refresh
          }
        }, CACHE_DURATION);
      }, 1000); // Debounce for 1 second
    };
    
    // Add event listeners for user activity - throttle events that fire frequently
    window.addEventListener('mousemove', handleUserActivity, { passive: true });
    window.addEventListener('keydown', handleUserActivity, { passive: true });
    window.addEventListener('scroll', handleUserActivity, { passive: true });
    window.addEventListener('click', handleUserActivity, { passive: true });
    
    // Initial activity trigger - but don't trigger immediately again
    // handleUserActivity(); -- Already fetched data above
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      
      if (userActivityTimeout) {
        window.clearTimeout(userActivityTimeout);
      }
      
      if (activityDebounceTimeout) {
        window.clearTimeout(activityDebounceTimeout);
      }
    };
  }, []);
  
  // Fetch data when display month changes
  useEffect(() => {
    fetchCalendarData(false);
  }, [displayMonth]);
  
  // Generate calendar data with booking tubes
  const generateCalendarData = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    // Get all days in the month
    const daysInMonth = [];
    let currentDate = new Date(monthStart);
    while (currentDate <= monthEnd) {
      daysInMonth.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Create weeks structure
    const startDay = getDay(monthStart);
    const weeks: Array<Array<Date | null>> = [];
    let currentWeek: Array<Date | null> = [];
    
    // Add leading empty cells for the first week
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }
    
    // Fill in the days
    for (let i = 0; i < daysInMonth.length; i++) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(daysInMonth[i]);
    }
    
    // Add trailing empty cells for the last week
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
    
    // Create a simple array of booking spans
    interface BookingSpan {
      booking: BookingEvent;
      weekIndex: number;
      dayInWeek: number;
      spanWidth: number;
      spanStart: Date;
      spanEnd: Date;
      isFirstSegment: boolean;
      isLastSegment: boolean;
    }

    const bookingSpans: BookingSpan[] = [];
    
    // Process each booking for this month
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      
      // Skip bookings that don't overlap with this month
      if (booking.end < monthStart || booking.start > monthEnd) {
        continue;
      }
      
      // Clamp booking to the current month
      const spanStart = booking.start < monthStart ? monthStart : booking.start;
      const spanEnd = booking.end > monthEnd ? monthEnd : booking.end;
      
      // For each day in the booking span, determine its position
      let currentDay = new Date(spanStart);
      
      while (currentDay <= spanEnd) {
        // Find which week and day in the week this date falls in
        const dayOfMonth = currentDay.getDate();
        const dayIndex = dayOfMonth - 1 + startDay;
        const weekIndex = Math.floor(dayIndex / 7);
        const dayInWeek = dayIndex % 7;
        
        // Is this the start or end of a booking?
        const isFirstDay = currentDay.getTime() === booking.start.getTime();
        const isLastDay = currentDay.getTime() === booking.end.getTime();
        
        // Is this the start or end of the visible portion of the booking in this month?
        const isFirstSegmentInMonth = currentDay.getTime() === spanStart.getTime();
        const isLastSegmentInMonth = currentDay.getTime() === spanEnd.getTime();
        
        // Add booking span for this day
        bookingSpans.push({
          booking,
          weekIndex,
          dayInWeek,
          spanWidth: 1, // Each span is just one day
          spanStart: new Date(currentDay),
          spanEnd: new Date(currentDay),
          isFirstSegment: isFirstDay, // Use the actual booking start, not just the visible portion
          isLastSegment: isLastDay    // Use the actual booking end, not just the visible portion
        });
        
        // Go to next day
        const nextDay = new Date(currentDay);
        nextDay.setDate(nextDay.getDate() + 1);
        currentDay = nextDay;
      }
    }
    
    // Merge adjacent booking spans in the same week
    const mergedSpans = [];
    
    // Group spans by week
    const spansByWeek: Record<string, BookingSpan[]> = {};
    for (let i = 0; i < bookingSpans.length; i++) {
      const span = bookingSpans[i];
      const key = `${span.booking.source}_${span.weekIndex}`;
      
      if (!spansByWeek[key]) {
        spansByWeek[key] = [];
      }
      
      spansByWeek[key].push(span);
    }
    
    // For each week, merge adjacent spans
    for (const key in spansByWeek) {
      const weekSpans = spansByWeek[key];
      
      // Sort by day in week
      weekSpans.sort((a: BookingSpan, b: BookingSpan) => a.dayInWeek - b.dayInWeek);
      
      let currentSpan = weekSpans[0];
      
      for (let i = 1; i < weekSpans.length; i++) {
        const nextSpan = weekSpans[i];
        
        // If these are adjacent, merge them
        if (nextSpan.dayInWeek === currentSpan.dayInWeek + currentSpan.spanWidth) {
          currentSpan.spanWidth += nextSpan.spanWidth;
          currentSpan.spanEnd = nextSpan.spanEnd;
          currentSpan.isLastSegment = nextSpan.isLastSegment;
        } else {
          // Not adjacent, add current and start a new one
          mergedSpans.push(currentSpan);
          currentSpan = nextSpan;
        }
      }
      
      // Add the last span in this week
      mergedSpans.push(currentSpan);
    }
    
    return { weeks, bookingSpans: mergedSpans };
  };

  // Calendar month renderer
  const renderMonth = (month: Date) => {
    const { weeks, bookingSpans } = generateCalendarData(month);
    
    return (
      <div key={month.toISOString()}>
        <div className="text-base font-medium mb-1 text-gray-700">
          {format(month, 'MMMM yyyy')}
        </div>
        
        <div className="relative">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                  <th key={i} className="text-xs font-normal text-gray-500 pb-2">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIndex) => (
                <tr key={weekIndex} className="h-12 relative">
                  {week.map((day, dayIndex) => {
                    // Find if day is part of a booking
                    const isBooked = day !== null && isDateBooked(day, bookings);
                    const isDisabled = day === null || (day !== null && day < today);
                    const isToday = day !== null && isSameDay(day, today);
                    
                    return (
                      <td 
                        key={dayIndex} 
                        className={cn(
                          "relative align-top p-1 border border-gray-100",
                          isDisabled ? "bg-gray-50" : "bg-white"
                        )}
                      >
                        {day && (
                          <div 
                            className={cn(
                              "flex justify-center items-center text-sm font-medium w-8 h-8 mx-auto", 
                              isDisabled ? "text-gray-400" : "text-gray-900",
                              isToday && !isBooked ? "bg-red-500 text-white rounded-full" : "",
                              isToday && isBooked ? "border-2 border-red-500 rounded-full" : ""
                            )}
                          >
                            {format(day, 'd')}
                          </div>
                        )}
                        

                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Booking "tubes" overlaid on the calendar */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {bookingSpans.map((span, index) => {
              // Calculate position and width of the booking "tube"
              const weekTop = 32 + (span.weekIndex * 48) + 20; // lifted 4px closer to date numbers
              const dayWidth = 100 / 7; // Width percentage per day
              
              // Calculate starting position (as percentage)
              const left = `${span.dayInWeek * dayWidth}%`;
              
              // Calculate width for this segment
              const width = `${span.spanWidth * dayWidth}%`;
              
              // Determine if this is a segment at the start or end of the booking
              const isFirstDay = span.isFirstSegment;
              const isLastDay = span.isLastSegment;
              
              // Adjust left position and width for rounded corners
              let adjustedLeft = left;
              let adjustedWidth = width;
              
              // If this is the first day of a multi-day span, adjust for rounded left
              if (isFirstDay && span.spanWidth > 1) {
                adjustedLeft = `calc(${left} + 4px)`;
                adjustedWidth = `calc(${width} - 4px)`;
              }
              
              // If this is the last day of a multi-day span, adjust for rounded right
              if (isLastDay && span.spanWidth > 1) {
                adjustedWidth = `calc(${adjustedWidth} - 4px)`;
              }
              
              // For debugging - log the booking tube positions and dates
              console.log(`Booking tube ${index+1}: ${format(span.booking.start, 'MMM d')} - ${format(span.booking.end, 'MMM d')}`);
              console.log(`- Week ${span.weekIndex}, starting at day ${span.dayInWeek}, width: ${span.spanWidth} days`);
              console.log(`- Styles: left=${adjustedLeft}, width=${adjustedWidth}`);
              
              return (
                <div 
                  key={index}
                  className={cn(
                    "absolute h-4 bg-[#6E59A5] flex items-center overflow-hidden",
                    isFirstDay && isLastDay ? "rounded-full" : // Both start and end in this row
                    isFirstDay ? "rounded-l-full" : // Just starts in this row
                    isLastDay ? "rounded-r-full" : // Just ends in this row
                    "",
                    // If today is part of this booking span, add a distinctive border
                    isSameDay(span.spanStart, today) || 
                    isSameDay(span.spanEnd, today) ||
                    (span.spanStart <= today && span.spanEnd >= today) ? "border-2 border-white" : ""
                  )}
                  style={{
                    top: `${weekTop}px`,
                    left: adjustedLeft,
                    width: adjustedWidth,
                    zIndex: 10,
                    opacity: 0.85 // Slightly transparent to see text underneath
                  }}
                >
                  {/* No text in booking tubes */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const SHOW_DEBUG = false;

  return (
    <div className={cn("relative", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <p className="text-[#6E59A5]">Loading calendar...</p>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      
      <div className="flex flex-col">
        {/* Scrollable container for months - only show one month height */}
        <div 
          ref={calendarContainerRef}
          className="h-[350px] overflow-y-auto pr-2 rounded-lg border border-gray-200 bg-white relative"
          style={{
            borderWidth: '1px',
            borderColor: 'rgba(209, 213, 219, 1)',
          }}
        >
          <div className="p-4 space-y-0 relative z-0">
            {displayedMonths.map(month => renderMonth(month))}
          </div>
        </div>
        
        {/* Debug Panel - toggled via SHOW_DEBUG */}
        {SHOW_DEBUG && (
          <div className="mt-8 p-4 bg-gray-100 rounded text-xs" style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap'}}>
            <h3 className="font-bold mb-2">Calendar Debug Info:</h3>
            {debugInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;

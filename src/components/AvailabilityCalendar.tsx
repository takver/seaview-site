
import React, { useEffect, useState } from 'react';
import { BookingEvent, fetchAllCalendars, isCheckInOutDay, isDateBooked } from '@/utils/calendar';
import { Calendar } from '@/components/ui/calendar';
import { addMonths } from 'date-fns';
import { cn } from '@/lib/utils';

interface AvailabilityCalendarProps {
  className?: string;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ className }) => {
  const [bookings, setBookings] = useState<BookingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const today = new Date();
  const nextMonth = addMonths(today, 1);

  // Function to fetch calendar data
  const fetchCalendarData = async () => {
    try {
      setIsLoading(true);
      const events = await fetchAllCalendars();
      setBookings(events);
      setError(null);
    } catch (err) {
      setError('Failed to load availability data');
      console.error('Error fetching calendar data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on mount and set up refresh interval
  useEffect(() => {
    fetchCalendarData();
    
    // Refresh data every minute
    const intervalId = setInterval(fetchCalendarData, 60000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

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
        <div className="flex justify-between mb-4">
          <div className="text-lg font-normal text-[#6E59A5]">
            Availability Calendar
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Calendar
            mode="multiple"
            selected={[]}
            onSelect={() => {}} // Read-only calendar
            disabled={(date) => date < today}
            month={today}
            numberOfMonths={2}
            fixedWeeks
            showOutsideDays
            className="pointer-events-auto rounded border shadow"
            classNames={{
              day: cn("h-9 w-9 p-0 font-normal", (date) => {
                if (isCheckInOutDay(date, bookings)) {
                  // Check-in/out days have split colors
                  return 'bg-gradient-to-r from-[#F2FCE2] to-[#ea384c] hover:bg-none';
                } else if (isDateBooked(date, bookings)) {
                  // Booked days are red
                  return 'bg-[#ea384c] text-white hover:bg-[#ea384c]/90';
                } else {
                  // Available days are soft green
                  return 'bg-[#F2FCE2] hover:bg-[#F2FCE2]/90';
                }
              }),
              day_today: "bg-accent text-accent-foreground font-semibold",
            }}
            components={{
              Day: ({ date, ...props }) => (
                <div 
                  {...props} 
                  className={cn(
                    "h-9 w-9 p-0 font-normal", 
                    isCheckInOutDay(date, bookings) 
                      ? 'bg-gradient-to-r from-[#F2FCE2] to-[#ea384c] hover:bg-none' 
                      : isDateBooked(date, bookings)
                      ? 'bg-[#ea384c] text-white hover:bg-[#ea384c]/90'
                      : 'bg-[#F2FCE2] hover:bg-[#F2FCE2]/90'
                  )}
                >
                  {date.getDate()}
                </div>
              ),
            }}
          />
        </div>
        
        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#F2FCE2] rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#ea384c] rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-[#F2FCE2] to-[#ea384c] rounded"></div>
            <span className="text-sm">Check-in/out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;

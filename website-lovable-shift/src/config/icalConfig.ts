export interface ICalSource {
  name: string;
  url: string;
}

/**
 * Array of iCal sources to check for availability
 * A day is only available if it's available in ALL calendars
 */
export const icalSources: ICalSource[] = [
  {
    name: "Booking.com",
    url: "https://ical.booking.com/v1/export?t=8e18c708-f533-4e73-b9d2-a7be35ca1899"
  },
  {
    name: "Airbnb",
    url: "https://www.airbnb.com/calendar/ical/908766266127651509.ics?s=b886adc0ae4b9ad7df1faf690af8f5d6"
  },
  // Add up to 4 more sources as needed
  // {
  //   name: "Airbnb",
  //   url: "https://www.airbnb.com/calendar/ical/12345.ics"
  // },
];

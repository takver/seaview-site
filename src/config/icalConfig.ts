
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
    url: "https://admin.booking.com/hotel/hoteladmin/ical.html?t=f471ba5d-84df-4e98-8d3a-77b1afaefce9"
  },
  // Add up to 4 more sources as needed
  // {
  //   name: "Airbnb",
  //   url: "https://www.airbnb.com/calendar/ical/12345.ics"
  // },
];

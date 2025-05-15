import { BookingEvent, mergeOverlappingBookings } from './calendar';

// Test function to log results
function testMergeBookings(testName: string, bookings: BookingEvent[]) {
  console.log(`\n--- Test: ${testName} ---`);
  
  console.log("Original bookings:");
  bookings.forEach(booking => {
    console.log(`- ${booking.start.toISOString().split('T')[0]} to ${booking.end.toISOString().split('T')[0]} (${booking.source})`);
  });
  
  const mergedBookings = mergeOverlappingBookings(bookings);
  
  console.log("\nMerged bookings:");
  mergedBookings.forEach(booking => {
    console.log(`- ${booking.start.toISOString().split('T')[0]} to ${booking.end.toISOString().split('T')[0]} (${booking.source})`);
  });
  
  console.log("------------------------\n");
  return mergedBookings;
}

// Test 1: Overlapping bookings from different sources (similar to example in user query)
const test1Bookings: BookingEvent[] = [
  {
    start: new Date('2025-05-30'),
    end: new Date('2025-06-04'),
    summary: "Airbnb (Not available)",
    source: "Airbnb"
  },
  {
    start: new Date('2025-05-31'),
    end: new Date('2025-06-03'),
    summary: "CLOSED - Not available",
    source: "Booking.com"
  }
];

const test1Result = testMergeBookings("Overlapping bookings from different sources", test1Bookings);

// Test 2: Consecutive bookings (end date of first = start date of second)
const test2Bookings: BookingEvent[] = [
  {
    start: new Date('2025-07-01'),
    end: new Date('2025-07-05'),
    summary: "Airbnb (Not available)",
    source: "Airbnb"
  },
  {
    start: new Date('2025-07-05'),
    end: new Date('2025-07-10'),
    summary: "CLOSED - Not available",
    source: "Booking.com"
  }
];

const test2Result = testMergeBookings("Consecutive bookings", test2Bookings);

// Test 3: Adjacent bookings (one day gap, should still merge)
const test3Bookings: BookingEvent[] = [
  {
    start: new Date('2025-08-01'),
    end: new Date('2025-08-05'),
    summary: "Airbnb (Not available)",
    source: "Airbnb"
  },
  {
    start: new Date('2025-08-06'),
    end: new Date('2025-08-10'),
    summary: "CLOSED - Not available",
    source: "Booking.com"
  }
];

const test3Result = testMergeBookings("Adjacent bookings with 1-day gap", test3Bookings);

// Test 4: Non-overlapping, non-consecutive bookings
const test4Bookings: BookingEvent[] = [
  {
    start: new Date('2025-09-01'),
    end: new Date('2025-09-05'),
    summary: "Airbnb (Not available)",
    source: "Airbnb"
  },
  {
    start: new Date('2025-09-07'),
    end: new Date('2025-09-10'),
    summary: "CLOSED - Not available",
    source: "Booking.com"
  }
];

const test4Result = testMergeBookings("Non-overlapping, non-consecutive bookings", test4Bookings);

// Test 5: Multiple overlapping bookings
const test5Bookings: BookingEvent[] = [
  {
    start: new Date('2025-10-01'),
    end: new Date('2025-10-10'),
    summary: "Airbnb (Not available)",
    source: "Airbnb"
  },
  {
    start: new Date('2025-10-05'),
    end: new Date('2025-10-15'),
    summary: "CLOSED - Not available",
    source: "Booking.com"
  },
  {
    start: new Date('2025-10-12'),
    end: new Date('2025-10-20'),
    summary: "VRBO Booking",
    source: "VRBO"
  }
];

const test5Result = testMergeBookings("Multiple overlapping bookings", test5Bookings);

// Log final assertion results
console.log("Test Results:");
console.log(`Test 1: ${test1Result.length === 1 ? "PASS" : "FAIL"} - Should merge to 1 booking`);
console.log(`Test 2: ${test2Result.length === 1 ? "PASS" : "FAIL"} - Should merge to 1 booking`);
console.log(`Test 3: ${test3Result.length === 1 ? "PASS" : "FAIL"} - Should merge to 1 booking`);
console.log(`Test 4: ${test4Result.length === 2 ? "PASS" : "FAIL"} - Should remain as 2 bookings`);
console.log(`Test 5: ${test5Result.length === 1 ? "PASS" : "FAIL"} - Should merge to 1 booking`); 
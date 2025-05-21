// Simple test script for calendar functions
import { execSync } from 'child_process';

// Create a TypeScript test file
const testFileContent = `
import { BookingEvent, mergeOverlappingBookings } from './src/utils/calendar';

// Example from user query
const bookings: BookingEvent[] = [
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

console.log("Original bookings:");
bookings.forEach(booking => {
  console.log(\`- \${booking.source}: \${booking.start.toISOString().split('T')[0]} to \${booking.end.toISOString().split('T')[0]} - \${booking.summary}\`);
});

const mergedBookings = mergeOverlappingBookings(bookings);

console.log("\\nMerged bookings:");
mergedBookings.forEach(booking => {
  console.log(\`- \${booking.source}: \${booking.start.toISOString().split('T')[0]} to \${booking.end.toISOString().split('T')[0]} - \${booking.summary}\`);
});
`;

// Write to a temporary file
import { writeFileSync } from 'fs';
writeFileSync('temp-test.ts', testFileContent);

try {
  console.log('Running calendar merge test...');
  execSync('npx tsx temp-test.ts', { stdio: 'inherit' });
} catch (error) {
  console.error('Error running test:', error);
} finally {
  // Clean up
  try {
    execSync('rm temp-test.ts');
  } catch (e) {
    console.error('Error deleting temp file:', e);
  }
} 
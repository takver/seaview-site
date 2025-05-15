// Simple script to run the calendar.test.ts file
import { execSync } from 'child_process';

try {
  console.log('Running calendar.test.ts...');
  execSync('npx ts-node src/utils/calendar.test.ts', { stdio: 'inherit' });
} catch (error) {
  console.error('Error running tests:', error);
} 
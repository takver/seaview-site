// Simple script to test if the site is accessible and check for errors
const http = require('http');

console.log('Testing connection to http://localhost:8080...');

const req = http.get('http://localhost:8080', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response received successfully');
    
    // Check for common error indicators in the HTML
    if (data.includes('Error:') || data.includes('error:') || data.includes('Uncaught') || data.includes('Exception')) {
      console.log('Potential errors found in the response:');
      const errorLines = data.split('\n').filter(line => 
        line.includes('Error:') || 
        line.includes('error:') || 
        line.includes('Uncaught') || 
        line.includes('Exception')
      );
      console.log(errorLines);
    } else {
      console.log('No obvious errors found in the HTML response.');
    }
    
    // Check if root element exists
    if (data.includes('id="root"')) {
      console.log('Root element found. React should be able to mount.');
    } else {
      console.log('WARNING: Root element not found! React cannot mount the application.');
    }
    
    // Extract the main JS file path
    const jsMatch = data.match(/src="\/(@vite\/client|assets\/index-[^"]+\.js)"/g);
    if (jsMatch && jsMatch.length > 0) {
      console.log('JavaScript files found:');
      jsMatch.forEach(match => {
        const src = match.replace('src="/', '').replace('"', '');
        console.log(`- ${src}`);
      });
      
      // Try to fetch the main JS file
      const mainJsFile = jsMatch[jsMatch.length - 1].replace('src="', '').replace('"', '');
      console.log(`\nAttempting to fetch main JS file: ${mainJsFile}`);
      
      http.get(`http://localhost:8080${mainJsFile}`, (jsRes) => {
        console.log(`JS file status: ${jsRes.statusCode}`);
        if (jsRes.statusCode === 200) {
          console.log('Main JavaScript file is accessible.');
        } else {
          console.log('WARNING: Main JavaScript file returned non-200 status code.');
        }
      }).on('error', (err) => {
        console.error(`Error fetching JS file: ${err.message}`);
      });
    } else {
      console.log('WARNING: No JavaScript files found in the HTML!');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end(); 
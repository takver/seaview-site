#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Configuration
const BASE_URL = process.env.SITE_URL || 'http://localhost:3000';
const PAGES_TO_CHECK = [
  '/'
];

// Extract text content from a page
async function extractPageText(page, url) {
  console.log(`${colors.blue}Extracting text from: ${url}${colors.reset}`);
  
  try {
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait a bit for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract all visible text content
    const textContent = await page.evaluate(() => {
      // Helper function to check if element is visible
      function isVisible(elem) {
        if (!elem) return false;
        const style = window.getComputedStyle(elem);
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               style.opacity !== '0' &&
               elem.offsetWidth > 0 &&
               elem.offsetHeight > 0;
      }
      
      // Get text from element, handling various cases
      function getTextFromElement(element) {
        if (!isVisible(element)) return '';
        
        // Skip script and style tags
        if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') {
          return '';
        }
        
        // For input elements, get placeholder or value
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          return element.placeholder || element.value || '';
        }
        
        // For images, get alt text
        if (element.tagName === 'IMG') {
          return element.alt || '';
        }
        
        // Get text content
        let text = '';
        for (let node of element.childNodes) {
          if (node.nodeType === 3) { // Text node
            text += node.textContent;
          } else if (node.nodeType === 1) { // Element node
            text += getTextFromElement(node);
          }
        }
        
        return text;
      }
      
      // Get all text from body
      const bodyText = getTextFromElement(document.body);
      
      // Clean up the text
      return bodyText
        .split(/\s+/)
        .filter(word => word.trim().length > 0)
        .join(' ')
        .trim();
    });
    
    return textContent;
  } catch (error) {
    console.error(`${colors.red}Error extracting text from ${url}: ${error.message}${colors.reset}`);
    return null;
  }
}

// Extract text from all pages
async function extractAllText() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewport({ width: 1280, height: 800 });
  
  const extractedTexts = {};
  
  for (const pagePath of PAGES_TO_CHECK) {
    const url = BASE_URL + pagePath;
    const text = await extractPageText(page, url);
    
    if (text !== null) {
      extractedTexts[pagePath] = text;
      console.log(`${colors.green}✓ Extracted ${text.split(' ').length} words from ${pagePath}${colors.reset}`);
    }
  }
  
  await browser.close();
  
  return extractedTexts;
}

// Main function
async function main() {
  const isCheckpointMode = process.argv.includes('--checkpoint');
  
  console.log(`\n${colors.blue}🔍 Site Text Extractor${colors.reset}\n`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Mode: ${isCheckpointMode ? 'Creating checkpoint' : 'Extracting only'}\n`);
  
  // Check if the site is running
  try {
    const testBrowser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const testPage = await testBrowser.newPage();
    await testPage.goto(BASE_URL, { timeout: 5000 });
    await testBrowser.close();
  } catch (error) {
    console.error(`${colors.red}❌ Cannot connect to ${BASE_URL}${colors.reset}`);
    console.error(`${colors.yellow}Make sure the development server is running: npm run dev${colors.reset}\n`);
    process.exit(1);
  }
  
  // Extract text from all pages
  const extractedTexts = await extractAllText();
  
  if (isCheckpointMode) {
    // Save checkpoint
    const checkpointPath = path.join(__dirname, '..', 'text-checkpoint.json');
    const checkpoint = {
      timestamp: new Date().toISOString(),
      baseUrl: BASE_URL,
      pages: PAGES_TO_CHECK,
      texts: extractedTexts
    };
    
    fs.writeFileSync(checkpointPath, JSON.stringify(checkpoint, null, 2));
    console.log(`\n${colors.green}✅ Checkpoint saved to: text-checkpoint.json${colors.reset}`);
    console.log(`${colors.blue}Total pages checked: ${Object.keys(extractedTexts).length}${colors.reset}\n`);
  } else {
    // Just display the extracted text
    console.log('\n--- Extracted Text ---\n');
    for (const [page, text] of Object.entries(extractedTexts)) {
      console.log(`${colors.yellow}Page: ${page}${colors.reset}`);
      console.log(`Words: ${text.split(' ').length}`);
      console.log(`Preview: ${text.substring(0, 100)}...`);
      console.log('---\n');
    }
  }
}

// Run the script
main().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
}); 
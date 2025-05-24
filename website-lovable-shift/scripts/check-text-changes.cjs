#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { diffWords } = require('diff');

// Colors for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

// Configuration
const BASE_URL = process.env.SITE_URL || 'http://localhost:3000';

// Compare two text strings and return differences
function compareTexts(oldText, newText) {
  const changes = diffWords(oldText, newText);
  
  let hasChanges = false;
  const additions = [];
  const removals = [];
  
  changes.forEach(part => {
    if (part.added) {
      hasChanges = true;
      additions.push(part.value.trim());
    } else if (part.removed) {
      hasChanges = true;
      removals.push(part.value.trim());
    }
  });
  
  return { hasChanges, additions, removals };
}

// Main comparison function
async function main() {
  console.log(`\n${colors.blue}🔍 Site Text Change Detector${colors.reset}\n`);
  
  // Load checkpoint
  const checkpointPath = path.join(__dirname, '..', 'text-checkpoint.json');
  
  if (!fs.existsSync(checkpointPath)) {
    console.error(`${colors.red}❌ No checkpoint found at: text-checkpoint.json${colors.reset}`);
    console.error(`${colors.yellow}Run 'npm run text:checkpoint' first to create a baseline${colors.reset}\n`);
    process.exit(1);
  }
  
  let checkpoint;
  try {
    checkpoint = JSON.parse(fs.readFileSync(checkpointPath, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}❌ Error reading checkpoint: ${error.message}${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`Checkpoint created: ${new Date(checkpoint.timestamp).toLocaleString()}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Pages to check: ${checkpoint.pages.join(', ')}\n`);
  
  // Check if the site is running
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const testPage = await browser.newPage();
    await testPage.goto(BASE_URL, { timeout: 5000 });
    await testPage.close();
  } catch (error) {
    if (browser) await browser.close();
    console.error(`${colors.red}❌ Cannot connect to ${BASE_URL}${colors.reset}`);
    console.error(`${colors.yellow}Make sure the development server is running: npm run dev${colors.reset}\n`);
    process.exit(1);
  }
  
  // Extract current text
  console.log('Extracting current site text...\n');
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  let hasAnyChanges = false;
  const changeDetails = [];
  
  // Re-use extraction logic
  for (const pagePath of checkpoint.pages) {
    const url = BASE_URL + pagePath;
    console.log(`${colors.blue}Checking: ${pagePath}${colors.reset}`);
    
    try {
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Extract text using the same logic as the setup script
      const currentText = await page.evaluate(() => {
        // Same extraction logic as in extract-site-text.cjs
        function isVisible(elem) {
          if (!elem) return false;
          const style = window.getComputedStyle(elem);
          return style.display !== 'none' && 
                 style.visibility !== 'hidden' && 
                 style.opacity !== '0' &&
                 elem.offsetWidth > 0 &&
                 elem.offsetHeight > 0;
        }
        
        function getTextFromElement(element) {
          if (!isVisible(element)) return '';
          
          if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') {
            return '';
          }
          
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            return element.placeholder || element.value || '';
          }
          
          if (element.tagName === 'IMG') {
            return element.alt || '';
          }
          
          let text = '';
          for (let node of element.childNodes) {
            if (node.nodeType === 3) {
              text += node.textContent;
            } else if (node.nodeType === 1) {
              text += getTextFromElement(node);
            }
          }
          
          return text;
        }
        
        const bodyText = getTextFromElement(document.body);
        
        return bodyText
          .split(/\s+/)
          .filter(word => word.trim().length > 0)
          .join(' ')
          .trim();
      });
      
      // Compare with checkpoint
      const checkpointText = checkpoint.texts[pagePath] || '';
      const comparison = compareTexts(checkpointText, currentText);
      
      if (comparison.hasChanges) {
        hasAnyChanges = true;
        console.log(`${colors.red}✗ Changes detected${colors.reset}`);
        
        changeDetails.push({
          page: pagePath,
          additions: comparison.additions,
          removals: comparison.removals
        });
      } else {
        console.log(`${colors.green}✓ No changes${colors.reset}`);
      }
      
    } catch (error) {
      console.error(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
      hasAnyChanges = true;
      changeDetails.push({
        page: pagePath,
        error: error.message
      });
    }
  }
  
  await browser.close();
  
  // Report results
  console.log('\n' + '='.repeat(60) + '\n');
  
  if (hasAnyChanges) {
    console.log(`${colors.red}❌ TEXT CHANGES DETECTED${colors.reset}\n`);
    
    changeDetails.forEach(detail => {
      console.log(`${colors.yellow}Page: ${detail.page}${colors.reset}`);
      
      if (detail.error) {
        console.log(`${colors.red}Error: ${detail.error}${colors.reset}`);
      } else {
        if (detail.removals.length > 0) {
          console.log(`${colors.red}Removed text:${colors.reset}`);
          detail.removals.forEach(text => {
            console.log(`  - "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`);
          });
        }
        
        if (detail.additions.length > 0) {
          console.log(`${colors.green}Added text:${colors.reset}`);
          detail.additions.forEach(text => {
            console.log(`  + "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`);
          });
        }
      }
      
      console.log('');
    });
    
    console.log(`${colors.yellow}To update the checkpoint with these changes, run:${colors.reset}`);
    console.log(`${colors.cyan}npm run text:checkpoint${colors.reset}\n`);
    
    process.exit(1);
  } else {
    console.log(`${colors.green}✅ No text changes detected${colors.reset}`);
    console.log(`All ${checkpoint.pages.length} pages match the checkpoint\n`);
    process.exit(0);
  }
}

// Run the script
main().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
}); 
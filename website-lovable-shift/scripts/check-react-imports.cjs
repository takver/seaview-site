#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Colors for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

let hasErrors = false;
const errors = [];

// Check TypeScript configuration
function checkTsConfig() {
  console.log('Checking TypeScript configuration...');
  
  const tsConfigPath = path.join(__dirname, '..', 'tsconfig.app.json');
  const tsConfigContent = fs.readFileSync(tsConfigPath, 'utf8');
  
  // Use regex to find the jsx option
  const jsxMatch = tsConfigContent.match(/"jsx"\s*:\s*"([^"]+)"/);
  const jsxOption = jsxMatch ? jsxMatch[1] : null;
  
  if (jsxOption !== 'react-jsx') {
    hasErrors = true;
    errors.push({
      file: 'tsconfig.app.json',
      issue: `jsx option should be "react-jsx" for the new JSX transform (found: "${jsxOption || 'not set'}")`
    });
  }
}

// Check for React default imports in component files
function checkReactImports() {
  console.log('Checking React imports in component files...');
  
  const componentFiles = glob.sync('src/components/**/index.tsx', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });
  
  const pageFiles = glob.sync('src/pages/**/*.tsx', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });
  
  const allFiles = [...componentFiles, ...pageFiles];
  
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativeFile = path.relative(path.join(__dirname, '..'), file);
    
    // Check for default React import
    const defaultImportRegex = /import\s+React(?:\s*,\s*{[^}]*})?\s+from\s+['"]react['"]/;
    const fcImportRegex = /import\s+(?:type\s+)?{\s*[^}]*\bFC\b[^}]*}\s*from\s+['"]react['"]/;
    
    if (defaultImportRegex.test(content)) {
      hasErrors = true;
      errors.push({
        file: relativeFile,
        issue: 'Found default React import. Use named imports only (e.g., import { useState } from "react")'
      });
    }
    
    if (fcImportRegex.test(content)) {
      hasErrors = true;
      errors.push({
        file: relativeFile,
        issue: 'Found FC type import. Remove FC and use arrow functions without type annotations'
      });
    }
    
    // Check if file has JSX but no React-related imports (this is correct with new JSX transform)
    const hasJSX = /<[A-Z][a-zA-Z]*|<[a-z]+\s|<\//.test(content);
    const hasReactImport = /from\s+['"]react['"]/.test(content);
    const usesReactAPIs = /\b(useState|useEffect|useCallback|useMemo|useRef|useContext|useReducer|CSSProperties|MouseEvent|KeyboardEvent|ChangeEvent|FormEvent)\b/.test(content);
    
    // This is just informational - not an error
    if (hasJSX && !hasReactImport && !usesReactAPIs) {
      // This is correct - JSX without React import is fine with new transform
    }
  });
}

// Main execution
console.log('\n🔍 React Import Checker\n');

checkTsConfig();
checkReactImports();

if (hasErrors) {
  console.log(`\n${colors.red}❌ Found ${errors.length} issue(s):${colors.reset}\n`);
  errors.forEach(error => {
    console.log(`  ${colors.yellow}${error.file}${colors.reset}`);
    console.log(`    ${error.issue}\n`);
  });
  process.exit(1);
} else {
  console.log(`\n${colors.green}✅ All React imports are correct!${colors.reset}\n`);
  process.exit(0);
} 
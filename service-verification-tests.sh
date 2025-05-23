#!/bin/bash

# Service Verification Tests
# Run this script after restarting or rebuilding services

echo "========================================="
echo "Service Verification Tests"
echo "========================================="
echo ""

# Test 1: Main Website (Port 3000)
echo "1. Testing Main Website (http://localhost:3000)"
echo "------------------------------------------------"

# Check if service is running
if lsof -i :3000 > /dev/null 2>&1; then
    echo "✓ Service is running on port 3000"
else
    echo "✗ Service NOT running on port 3000"
fi

# Check HTML response
if curl -s http://localhost:3000 | grep -q "<title>Sifnos Seaview</title>"; then
    echo "✓ HTML page loads with correct title"
else
    echo "✗ HTML page failed to load"
fi

# Check if React is rendering (look for component text)
if curl -s http://localhost:3000 | grep -q "Gallery\|Book Now\|Amenities"; then
    echo "✓ React components are rendering"
else
    echo "⚠ React components might not be rendering (check browser console)"
fi

# Check main.tsx is being served
if curl -s http://localhost:3000/src/main.tsx | grep -q "React initialization starting"; then
    echo "✓ JavaScript modules are being served"
else
    echo "✗ JavaScript modules not accessible"
fi

echo ""

# Test 2: Admin Gallery Arrange Page
echo "2. Testing Admin Gallery Page (http://localhost:3000/admin/gallery/arrange)"
echo "---------------------------------------------------------------------------"

# Check if admin page loads
admin_response=$(curl -s http://localhost:3000/admin/gallery/arrange)
if echo "$admin_response" | grep -q "<title>"; then
    echo "✓ Admin page HTML loads"
else
    echo "✗ Admin page failed to load"
fi

echo ""

# Test 3: iCal Proxy Server (Port 3001)
echo "3. Testing iCal Proxy Server (http://localhost:3001)"
echo "----------------------------------------------------"

# Check if service is running
if lsof -i :3001 > /dev/null 2>&1; then
    echo "✓ Service is running on port 3001"
else
    echo "✗ Service NOT running on port 3001"
fi

# Health check
if curl -s http://localhost:3001/health | grep -q '"status":"healthy"'; then
    echo "✓ Health check passed"
else
    echo "✗ Health check failed"
fi

# Cache info endpoint
cache_info=$(curl -s http://localhost:3001/api/cache-info)
if echo "$cache_info" | grep -q "cacheEntries"; then
    echo "✓ Cache info endpoint working"
    echo "  Cache info: $cache_info"
else
    echo "✗ Cache info endpoint failed"
fi

echo ""

# Test 4: Gallery API Endpoints
echo "4. Testing Gallery API Endpoints"
echo "--------------------------------"

# Get gallery order
if curl -s http://localhost:3000/api/v1/admin/gallery/get-order | grep -q "\["; then
    echo "✓ Gallery order API working"
else
    echo "✗ Gallery order API failed"
fi

# List images
if curl -s http://localhost:3000/api/v1/admin/gallery/list-images | grep -q "\["; then
    echo "✓ Gallery list images API working"
else
    echo "✗ Gallery list images API failed"
fi

echo ""

# Test 5: Build Test
echo "5. Build Test (optional - run with --build flag)"
echo "------------------------------------------------"
if [[ "$1" == "--build" ]]; then
    echo "Running build test..."
    cd website-lovable-shift
    if npm run build > /dev/null 2>&1; then
        echo "✓ Build successful"
    else
        echo "✗ Build failed - check errors"
        npm run build 2>&1 | grep -E "error|Error" | head -5
    fi
    cd ..
else
    echo "Skip build test (run with --build to include)"
fi

echo ""
echo "========================================="
echo "Test Summary"
echo "========================================="
echo ""
echo "If all tests pass, services are ready."
echo "If React components aren't rendering, check browser console for errors."
echo ""
echo "Common issues:"
echo "- Port already in use: Kill existing process with 'lsof -i :PORT | grep LISTEN | awk \"{print \$2}\" | xargs kill'"
echo "- Build errors: Check TypeScript errors and missing imports"
echo "- Blank page: Check browser console, ensure React imports are correct"
echo "" 
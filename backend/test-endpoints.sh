#!/bin/bash

# Test script for backend API endpoints
# Make sure the server is running before executing this script

BASE_URL="http://localhost:3001"

echo "Testing Backend API Endpoints"
echo "=============================="
echo ""

# Test 1: Health check
echo "1. Testing health endpoint..."
curl -s "$BASE_URL/health" | jq '.'
echo ""
echo ""

# Test 2: Resume summary
echo "2. Testing resume summary endpoint..."
curl -s "$BASE_URL/api/resume/summary" | jq '.'
echo ""
echo ""

# Test 3: Chat endpoint (without API key, will fail but shows structure works)
echo "3. Testing chat endpoint..."
curl -s -X POST "$BASE_URL/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "What experience does Alexander have with AI?"}' | jq '.'
echo ""
echo ""

# Test 4: Job assessment endpoint
echo "4. Testing job assessment endpoint..."
curl -s -X POST "$BASE_URL/api/chat/assess-fit" \
  -H "Content-Type: application/json" \
  -d '{"jobDescription": "Looking for a Senior Product Manager with AI and data platform experience"}' | jq '.'
echo ""
echo ""

# Test 5: Invalid request (missing message)
echo "5. Testing error handling (missing message)..."
curl -s -X POST "$BASE_URL/api/chat" \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.'
echo ""
echo ""

# Test 6: Session stats
echo "6. Testing session stats endpoint..."
curl -s "$BASE_URL/api/debug/sessions" | jq '.'
echo ""
echo ""

echo "=============================="
echo "Tests completed!"
echo ""
echo "Note: Chat and assessment tests may fail if GEMINI_API_KEY is not set correctly."
echo "This is expected. The important thing is that the server responds with proper error messages."

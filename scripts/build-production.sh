#!/bin/bash

# Production build script for deployment platforms
# This script builds both frontend and backend without validation

set -e  # Exit on any error

echo "================================"
echo "Building ResumeAI for production"
echo "================================"

# Build frontend
echo ""
echo "📦 Building frontend..."
cd frontend
npm ci --production=false
npm run build
echo "✓ Frontend build complete"

# Build backend
echo ""
echo "📦 Building backend..."
cd ../backend
npm ci --production=false
npm run build
echo "✓ Backend build complete"

echo ""
echo "================================"
echo "✓ Production build successful"
echo "================================"

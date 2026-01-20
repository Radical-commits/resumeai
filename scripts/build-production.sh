#!/bin/bash

# Production build script for deployment platforms
# This script builds both frontend and backend without validation

set -e  # Exit on any error

echo "Building frontend..."
(cd frontend && npm install --legacy-peer-deps && npm run build)

echo "Building backend..."
(cd backend && npm install --legacy-peer-deps && npm run build)

echo "Build complete!"

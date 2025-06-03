#!/bin/bash

# Exit on error
set -e

# Backend setup
echo "Setting up backend..."
cd backend
if [ ! -d "node_modules" ]; then
  npm install
else
  echo "Backend dependencies already installed."
fi

# Frontend setup
echo "Setting up frontend..."
cd ../frontend

# --- MODIFICATION START ---
echo "Ensuring a clean state for frontend dependencies..."
rm -rf node_modules
# Optionally, remove package-lock.json if it might be causing issues with npm install resolution.
# rm -f package-lock.json
echo "Installing frontend dependencies..."
npm install # This will install all dependencies listed in package.json
# --- MODIFICATION END ---

# Build frontend
echo "Building frontend..."
npm run build
cd ..

# Move frontend build to backend public directory
echo "Moving frontend build to backend..."
rm -rf backend/public
mkdir -p backend/public
# Copy static assets from Next.js build (e.g., _next/static)
# and public folder contents.
# The exact paths depend on whether Next.js is outputting a static build or standard build.
# For a standard 'next build', static assets are in .next/static.
# The backend server (e.g., Express) will need to be configured to serve these,
# and potentially handle Next.js page rendering if not a fully static export.
if [ -d "frontend/.next/static" ]; then
  cp -R frontend/.next/static backend/public/static
fi
if [ -d "frontend/public" ]; then
  cp -R frontend/public/* backend/public/
fi

# Start the application
# Assuming the backend's package.json has a 'start' script that runs the server.
# The backend should be configured to serve the frontend assets and handle API routes.
echo "Starting application (backend will serve frontend)..."
cd backend
# Example: Set a port and start the backend server
PORT=${PORT:-9000} # Default to 9000 if PORT is not set
echo "Starting backend server on port $PORT"
npm start

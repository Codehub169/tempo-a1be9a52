#!/bin/bash

# Exit on error, treat unset variables as an error, and ensure pipefail
set -e -u -o pipefail

# Get the directory of the script to resolve paths correctly
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

# Backend setup
echo "Setting up backend..."
cd "${SCRIPT_DIR}/backend"
if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
else
  echo "Backend dependencies already installed."
fi
cd "${SCRIPT_DIR}" # Return to root (project directory)

# Frontend setup
echo "Setting up frontend..."
cd "${SCRIPT_DIR}/frontend"

echo "Ensuring a clean state for frontend dependencies..."
rm -rf node_modules
# The following line removes package-lock.json to ensure fresh dependency resolution.
# This is done because it can sometimes cause issues with npm install resolution.
rm -f package-lock.json
echo "Installing frontend dependencies..."
npm install # This will install all dependencies listed in package.json

# Build frontend
echo "Building frontend..."
# For the backend to serve the frontend as static files (especially index.html),
# Next.js should be configured for static HTML export.
# Ensure 'output: "export"' is set in 'frontend/next.config.js'.
npm run build
cd "${SCRIPT_DIR}" # Return to root (project directory)

# Move frontend build to backend public directory
echo "Moving frontend build to backend..."
rm -rf "${SCRIPT_DIR}/backend/public"
mkdir -p "${SCRIPT_DIR}/backend/public"

# Copy assets from Next.js static export output directory ('out')
if [ -d "${SCRIPT_DIR}/frontend/out" ]; then
  echo "Copying frontend build from frontend/out/ to backend/public/..."
  # Using cp -a to preserve file attributes and handle symlinks correctly.
  # The trailing dot on the source path ensures contents are copied.
  cp -a "${SCRIPT_DIR}/frontend/out/." "${SCRIPT_DIR}/backend/public/"
else
  echo "Warning: frontend/out directory not found. Frontend may not be served correctly."
  echo "Ensure 'output: \"export\"' is in frontend/next.config.js and 'npm run build' ran successfully."
  echo "Also check that 'next build' does not require specific environment variables to be set."
fi

# Start the application
echo "Starting application (backend will serve frontend)..."
cd "${SCRIPT_DIR}/backend"
# Set a port and start the backend server
# PORT is used by backend/src/index.js
export PORT=${PORT:-9000} # Default to 9000 if PORT is not set, export it for npm start
echo "Starting backend server on port $PORT"
npm start

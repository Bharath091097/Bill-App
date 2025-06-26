#!/usr/bin/env bash
# Render.com build script

# Install dependencies
echo "Installing dependencies..."
yarn install --frozen-lockfile

# Build the application
echo "Building application..."
yarn build

echo "Build completed successfully!"
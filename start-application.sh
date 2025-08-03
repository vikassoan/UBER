#!/bin/bash

echo "Starting Uber Application..."

echo "Starting Backend..."
cd Backend
gnome-terminal -- bash -c "npm install && npm start; exec bash" &

echo "Starting Frontend..."
cd ../Frontend
gnome-terminal -- bash -c "npm install && npm run dev; exec bash" &

echo "Application starting..."
echo "Backend will be available at: http://localhost:4000"
echo "Frontend will be available at: http://localhost:5173"
echo ""
echo "Please make sure to:"
echo "1. Create .env files in both Backend and Frontend directories"
echo "2. Have MongoDB running locally"
echo "3. Have valid Google Maps API key configured"
echo ""
read -p "Press Enter to continue..." 
@echo off
echo Starting Uber Application...

echo Starting Backend...
cd Backend
start cmd /k "npm install && npm start"

echo Starting Frontend...
cd ../Frontend
start cmd /k "npm install && npm run dev"

echo Application starting...
echo Backend will be available at: http://localhost:4000
echo Frontend will be available at: http://localhost:5173
echo.
echo Please make sure to:
echo 1. Create .env files in both Backend and Frontend directories
echo 2. Have MongoDB running locally
echo 3. Have valid Google Maps API key configured
echo.
pause 
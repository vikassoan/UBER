# Uber Application Test Plan

## Environment Setup

### Backend Setup
1. Create `.env` file in Backend directory:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GOOGLE_MAPS_API=your-google-maps-api-key-here
```

### Frontend Setup
1. Create `.env` file in Frontend directory:
```
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

## Installation & Setup

### Backend
```bash
cd Backend
npm install
npm start
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

## Test Cases

### 1. User Registration & Login
- [ ] User can register with valid credentials
- [ ] User cannot register with existing email
- [ ] User can login with valid credentials
- [ ] User cannot login with invalid credentials
- [ ] Error messages display properly
- [ ] Loading states work correctly

### 2. Captain Registration & Login
- [ ] Captain can register with valid credentials and vehicle info
- [ ] Captain cannot register with existing email
- [ ] Captain can login with valid credentials
- [ ] Captain cannot login with invalid credentials
- [ ] Vehicle validation works correctly
- [ ] Error messages display properly

### 3. Authentication & Authorization
- [ ] Protected routes redirect to login when not authenticated
- [ ] JWT tokens work correctly
- [ ] Logout functionality works
- [ ] Token blacklisting works

### 4. Location Services
- [ ] Google Maps integration works
- [ ] Location search suggestions work
- [ ] Current location detection works
- [ ] Distance and time calculation works
- [ ] Fare calculation works correctly

### 5. Ride Creation Flow
- [ ] User can search for pickup location
- [ ] User can search for destination
- [ ] Fare calculation displays correctly
- [ ] Vehicle selection works
- [ ] Ride confirmation works
- [ ] Ride creation API call works

### 6. Socket Communication
- [ ] Socket connection establishes
- [ ] User joins socket room correctly
- [ ] Captain joins socket room correctly
- [ ] Real-time location updates work
- [ ] Ride status updates work

### 7. Captain Features
- [ ] Captain can see incoming ride requests
- [ ] Captain can accept rides
- [ ] Captain can start rides with OTP
- [ ] Captain can end rides
- [ ] Captain location tracking works

### 8. User Ride Experience
- [ ] User can see ride status updates
- [ ] User can see captain details
- [ ] User can track ride progress
- [ ] User can see OTP for ride start

## Known Issues Fixed

1. ✅ Syntax error in ride.controller.js (stray 's' character)
2. ✅ Typo in ride.model.js ('capatin' → 'captain')
3. ✅ Typo in ride.model.js ('selcet' → 'select')
4. ✅ Missing import in map.service.js (captainModel)
5. ✅ Inconsistent environment variable usage
6. ✅ Missing socket initialization in server.js
7. ✅ Missing error handling in frontend components
8. ✅ Inconsistent field names ('pickup' vs 'origin')
9. ✅ Missing validation in ride creation
10. ✅ Memory leak in LiveTracking component
11. ✅ Hardcoded values in components
12. ✅ Missing await in user service
13. ✅ Typo in map controller import
14. ✅ Component naming inconsistencies

## Performance & Security

- [ ] API responses are properly validated
- [ ] Error handling is comprehensive
- [ ] Loading states prevent multiple submissions
- [ ] Memory leaks are prevented
- [ ] Environment variables are properly configured
- [ ] CORS is properly configured
- [ ] JWT tokens are properly secured

## Browser Compatibility

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Mobile responsive design

## API Endpoints Tested

### User Endpoints
- [ ] POST /users/register
- [ ] POST /users/login
- [ ] GET /users/profile
- [ ] GET /users/logout

### Captain Endpoints
- [ ] POST /captains/register
- [ ] POST /captains/login
- [ ] GET /captains/profile
- [ ] GET /captains/logout

### Ride Endpoints
- [ ] POST /rides/create
- [ ] GET /rides/get-fare
- [ ] POST /rides/confirm
- [ ] GET /rides/start-ride
- [ ] POST /rides/end-ride

### Map Endpoints
- [ ] GET /maps/get-coordinates
- [ ] GET /maps/get-distance-time
- [ ] GET /maps/get-suggestions

## Socket Events Tested

- [ ] 'join' - User/Captain joining
- [ ] 'update-location-captain' - Captain location updates
- [ ] 'new-ride' - New ride notification
- [ ] 'ride-confirmed' - Ride confirmation
- [ ] 'ride-started' - Ride start
- [ ] 'ride-ended' - Ride end 
# Uber Clone Application

A full-stack Uber-like ride-sharing application built with React, Node.js, Express, MongoDB, and Socket.io.

## Features

- **User Authentication**: Register and login for both users and drivers (captains)
- **Real-time Location Tracking**: Live GPS tracking with Google Maps integration
- **Ride Booking**: Complete ride booking flow with fare calculation
- **Real-time Communication**: Socket.io for live updates between users and drivers
- **Responsive Design**: Mobile-first design that works on all devices
- **Secure API**: JWT authentication with token blacklisting

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Socket.io Client
- Google Maps API
- GSAP for animations
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io
- JWT Authentication
- bcrypt for password hashing
- Google Maps API integration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- Google Maps API key

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd UBER
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GOOGLE_MAPS_API=your-google-maps-api-key-here
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
```

Create a `.env` file in the Frontend directory:
```env
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

## Running the Application

### Option 1: Using the provided scripts

**Windows:**
```bash
start-application.bat
```

**Unix/Linux/Mac:**
```bash
chmod +x start-application.sh
./start-application.sh
```

### Option 2: Manual startup

**Backend:**
```bash
cd Backend
npm start
```

**Frontend:**
```bash
cd Frontend
npm run dev
```

## API Documentation

### Authentication Endpoints

#### User Registration
```
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

#### User Login
```
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Captain Registration
```
POST /captains/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Driver"
  },
  "email": "driver@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "type": "car"
  }
}
```

### Ride Endpoints

#### Get Fare
```
GET /rides/get-fare?pickup=Origin&destination=Destination
Authorization: Bearer <token>
```

#### Create Ride
```
POST /rides/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "pickup": "Origin Address",
  "destination": "Destination Address",
  "vehicleType": "car"
}
```

#### Confirm Ride (Captain)
```
POST /rides/confirm
Authorization: Bearer <token>
Content-Type: application/json

{
  "rideId": "ride_id_here"
}
```

#### Start Ride (Captain)
```
GET /rides/start-ride?rideId=ride_id&otp=123456
Authorization: Bearer <token>
```

## Socket Events

### Client to Server
- `join` - Join socket room with user type and ID
- `update-location-captain` - Update captain location

### Server to Client
- `new-ride` - New ride request for captains
- `ride-confirmed` - Ride confirmed by captain
- `ride-started` - Ride started by captain
- `ride-ended` - Ride completed

## Project Structure

```
UBER/
├── Backend/
│   ├── controllers/     # Route controllers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── middlewares/    # Authentication middleware
│   ├── db/            # Database connection
│   ├── socket.js      # Socket.io setup
│   ├── app.js         # Express app setup
│   └── server.js      # Server entry point
├── Frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # React context providers
│   │   ├── pages/      # Page components
│   │   └── main.jsx    # App entry point
│   └── package.json
└── README.md
```

## Key Features Implemented

### User Features
- User registration and login
- Location search with Google Places API
- Fare calculation based on distance and time
- Vehicle selection (Car, Bike, Auto)
- Real-time ride tracking
- OTP verification for ride start

### Captain Features
- Captain registration with vehicle details
- Real-time location updates
- Incoming ride notifications
- Ride acceptance and management
- OTP generation for ride start

### Technical Features
- JWT authentication with token blacklisting
- Real-time communication with Socket.io
- Google Maps integration
- Responsive design with Tailwind CSS
- Error handling and validation
- Loading states and user feedback

## Recent Bug Fixes

1. ✅ Fixed syntax error in ride controller
2. ✅ Fixed typos in database models
3. ✅ Added missing imports and dependencies
4. ✅ Fixed inconsistent environment variable usage
5. ✅ Added proper error handling in frontend
6. ✅ Fixed memory leaks in components
7. ✅ Fixed hardcoded values in UI components
8. ✅ Added proper validation and loading states
9. ✅ Fixed component naming inconsistencies
10. ✅ Added proper socket connection handling

## Testing

Use the provided test plan in `test-application.md` to verify all functionality works correctly.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes only.

## Support

For issues and questions, please create an issue in the repository. 
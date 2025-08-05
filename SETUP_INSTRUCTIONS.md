# Uber Clone - Setup Instructions

## Overview
This is a full-stack Uber clone application with real-time ride booking functionality. The application includes user and captain (driver) interfaces with real-time communication via WebSockets.

## Features Implemented

### ✅ Fixed Issues
1. **Captain Signup**: Fixed captain registration with proper validation and error handling
2. **Login Error Handling**: Users and captains are redirected to their respective login screens on authentication failure
3. **Ride Flow**: Complete ride booking flow with OTP verification
4. **UI Consistency**: Symmetrical and consistent design throughout the app

### ✅ Core Functionality
- User registration and login
- Captain (driver) registration and login
- Real-time ride booking
- OTP-based ride verification
- Live tracking (placeholder)
- Responsive design

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Environment Setup

### Backend Environment Variables
Create a `.env` file in the `Backend/` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/uber-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Cookie Configuration
COOKIE_SECRET=your-cookie-secret-here

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend Environment Variables
Create a `.env` file in the `Frontend/` directory:

```env
VITE_BASE_URL=http://localhost:3000
```

## Installation & Setup

### 1. Install Backend Dependencies
```bash
cd Backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd Frontend
npm install
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Start MongoDB (if installed locally)
mongod

# Or use MongoDB Atlas (cloud)
```

### 4. Start the Backend Server
```bash
cd Backend
npm start
```

The backend will start on `http://localhost:3000`

### 5. Start the Frontend Development Server
```bash
cd Frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## Application Flow

### User Flow
1. **Registration/Login**: Users can register or login
2. **Book Ride**: 
   - Enter pickup and destination
   - Select vehicle type
   - Confirm ride details
   - Wait for captain acceptance
3. **Ride Confirmation**: 
   - Receive captain details and OTP
   - Share OTP with captain
   - Ride starts after OTP verification

### Captain Flow
1. **Registration/Login**: Captains can register or login
2. **Receive Ride Requests**: Real-time notifications for new rides
3. **Accept Rides**: Review ride details and accept
4. **OTP Verification**: Enter OTP provided by user
5. **Start Ride**: Begin the journey after OTP verification

## API Endpoints

### Authentication
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `POST /captains/register` - Captain registration
- `POST /captains/login` - Captain login

### Rides
- `POST /rides/create` - Create a new ride
- `GET /rides/get-fare` - Calculate fare
- `POST /rides/confirm` - Captain confirms ride
- `POST /rides/start` - Start ride with OTP
- `POST /rides/end-ride` - End ride

### Maps
- `GET /maps/get-suggestions` - Get location suggestions
- `GET /maps/get-distance-time` - Calculate distance and time

## Real-time Communication

The application uses Socket.IO for real-time communication:

### Events
- `join` - Join user/captain to socket room
- `new-ride-request` - New ride available for captains
- `ride-confirmed` - Ride confirmed by captain
- `ride-started` - Ride started with OTP
- `ride-ended` - Ride completed
- `ride-rejected` - Ride rejected by captain

## UI Improvements

### Consistent Design System
- **Colors**: Primary (#111), Secondary (#eeeeee), Accent (#3b82f6)
- **Typography**: Consistent font sizes and weights
- **Spacing**: Uniform spacing using Tailwind classes
- **Components**: Reusable button and input styles
- **Responsive**: Mobile-first design approach

### Key Components
- **Login/Signup Forms**: Clean, centered layouts with proper validation
- **Ride Booking**: Step-by-step flow with clear progress indication
- **OTP Display**: Prominent OTP display for easy sharing
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file

2. **CORS Errors**
   - Verify `ALLOWED_ORIGINS` in backend `.env`
   - Check frontend `VITE_BASE_URL`

3. **Socket Connection Issues**
   - Ensure backend is running on correct port
   - Check browser console for connection errors

4. **Authentication Errors**
   - Clear browser localStorage
   - Check JWT_SECRET configuration

### Development Tips

1. **Backend Logs**: Check console for detailed error messages
2. **Frontend DevTools**: Use browser dev tools for debugging
3. **Socket Testing**: Use browser console to test socket events
4. **Database**: Use MongoDB Compass for database inspection

## File Structure

```
UBER/
├── Backend/
│   ├── controllers/     # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── middlewares/    # Authentication
│   ├── socket.js       # WebSocket setup
│   └── server.js       # Server entry point
├── Frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context
│   │   └── utils/      # Utility functions
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes only. 
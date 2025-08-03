const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: 'test'
  });
});

// Test user registration
app.post('/users/register', (req, res) => {
  console.log('Registration request:', req.body);
  
  const { fullname, email, password } = req.body;
  
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  // Simulate successful registration
  const mockUser = {
    _id: '123456789',
    fullname,
    email,
    password: 'hashed_password'
  };
  
  const mockToken = 'mock_jwt_token_123';
  
  res.status(201).json({ 
    token: mockToken, 
    user: mockUser 
  });
});

// Test user login
app.post('/users/login', (req, res) => {
  console.log('Login request:', req.body);
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Simulate successful login
  const mockUser = {
    _id: '123456789',
    fullname: { firstname: 'Test', lastname: 'User' },
    email: email
  };
  
  const mockToken = 'mock_jwt_token_123';
  
  res.status(200).json({ 
    token: mockToken, 
    user: mockUser 
  });
});

// Test map suggestions
app.get('/maps/get-suggestions', (req, res) => {
  const { input } = req.query;
  
  if (!input) {
    return res.status(400).json({ message: 'Input is required' });
  }
  
  // Mock suggestions
  const suggestions = [
    { description: `${input} - Location 1`, place_id: 'place1' },
    { description: `${input} - Location 2`, place_id: 'place2' },
    { description: `${input} - Location 3`, place_id: 'place3' }
  ];
  
  res.status(200).json(suggestions);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl 
  });
});

app.listen(port, () => {
  console.log(`✅ Test server running on port ${port}`);
  console.log(`🌐 Health check: http://localhost:${port}/health`);
  console.log(`📱 API base: http://localhost:${port}`);
}); 
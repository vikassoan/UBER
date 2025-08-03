const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const connectDB = require('./db/db');
const port = process.env.PORT || 3000;

// Connect to database (but don't require it)
connectDB();

const server = http.createServer(app);

// Initialize socket.io
initializeSocket(server);

// Add error handling for the server
server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
    }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Don't exit the process immediately
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit the process
});

server.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
    console.log(`🌐 Health check: http://localhost:${port}/health`);
    console.log(`📱 API base: http://localhost:${port}`);
});
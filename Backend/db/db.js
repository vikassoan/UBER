const mongoose = require('mongoose');

function connectDB() {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/uber-app';
    
    const options = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    };

    mongoose.connect(mongoURI, options)
        .then(() => {
            console.log('✅ MongoDB connected successfully');
        })
        .catch(err => {
            console.error('❌ MongoDB connection error:', err.message);
            console.log('⚠️  Server will continue without database connection');
            // Don't exit the process, let the server run without DB for testing
        });

    // Handle connection events
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        // Don't exit the process on connection errors
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
        // Don't exit the process on disconnection
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
        try {
            if (mongoose.connection.readyState === 1) {
                await mongoose.connection.close();
                console.log('MongoDB connection closed through app termination');
            }
            process.exit(0);
        } catch (err) {
            console.error('Error during MongoDB shutdown:', err);
            process.exit(1);
        }
    });

    // Prevent process exit on unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        // Don't exit the process
    });
} 

module.exports = connectDB;
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blackList.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
            });
        }

        const { fullname, email, password } = req.body;

        if (!fullname?.firstname || !fullname?.lastname) {
            return res.status(400).json({ message: 'First name and last name are required' });
        }

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log('Registering user:', { email: email.toLowerCase(), firstname: fullname.firstname });

        const isUserExists = await userModel.findOne({ email: email.toLowerCase() });
        if (isUserExists) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname.trim(),
            lastname: fullname.lastname.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        const token = user.generateAuthToken();
        
        // Set cookie for session management
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Remove sensitive data before sending response
        const userResponse = user.toObject();
        delete userResponse.password;

        console.log('User registered successfully:', userResponse._id);

        res.status(201).json({ 
            message: 'Registration successful',
            token, 
            user: userResponse
        });
    } catch (error) {
        console.error('User registration error:', error);
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
            });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log('User login attempt:', email.toLowerCase());

        const user = await userModel.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        
        // Set cookie for session management
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Remove sensitive data before sending response
        const userResponse = user.toObject();
        delete userResponse.password;

        console.log('User logged in successfully:', userResponse._id);

        res.status(200).json({ 
            message: 'Login successful',
            token, 
            user: userResponse 
        });
    } catch (error) {
        console.error('User login error:', error);
        next(error);
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        
        console.log('Getting user profile:', req.user._id);
        res.status(200).json(req.user);
    } catch (error) {
        console.error('Get user profile error:', error);
        next(error);
    }
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (token) {
            await blackListTokenModel.create({ 
                token,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
            });
        }

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        console.log('User logged out successfully');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('User logout error:', error);
        next(error);
    }
}
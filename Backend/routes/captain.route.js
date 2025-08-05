const express = require('express');
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Test endpoint to get captain data
router.get('/test-captain/:id', async (req, res) => {
    try {
        const captainModel = require('../models/captain.model');
        const captain = await captainModel.findById(req.params.id);
        
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }
        
        res.json({ captain });
    } catch (error) {
        console.error('Test captain error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('fullname.lastname').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.type').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
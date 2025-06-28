const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');
connectDB();
const userRoutes = require('./routes/user.route');
const captainRoutes = require('./routes/captain.route');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello, World!');
})
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
module.exports = app;
// Importing the required modules
const router = require('express').Router();

// Importing the route handlers for different routes
const pageRoutes = require('./pageRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');

// Defining the routes and their corresponding route handlers
router.use('/dashboard', dashboardRoutes); // Handles dashboard related routes
router.use('/', pageRoutes); // Handles general page routes
router.use('/user', userRoutes); // Handles user related routes
router.use('/post', postRoutes); // Handles post related routes

// Exporting the router module
module.exports = router;

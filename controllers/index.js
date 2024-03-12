// Importing the required modules
const router = require('express').Router();

// Importing the route handlers for different routes
const pageRoutes = require('./pageRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

router.use('/api', apiRoutes); // Handles API routes
// Defining the routes and their corresponding route handlers
router.use('/dashboard', dashboardRoutes); // Handles dashboard related routes
router.use('/', pageRoutes); // Handles general page routes


// Exporting the router module
module.exports = router;

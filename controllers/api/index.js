// Importing the required modules
const router = require('express').Router();

// I
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes); // Handles user related routes
router.use('/posts', postRoutes); // Handles post related routes

// Exporting the router module
module.exports = router;
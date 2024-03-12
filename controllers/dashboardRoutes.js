// Import required modules
const router = require('express').Router();
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
    try {
        // Fetch all posts
        const postData = await Post.findAll();
        // Map the fetched data to plain objects
        const posts = postData.map((post) => post.get({ plain: true }));
        // Render the homepage template with the posts data
        res.render('homepage', { posts });
    } catch (err) {
        // Handle errors
        res.status(500).json(err);
    }
});

// Post route
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        // Find a post by its ID
        const postData = await Post.findByPk(req.params.id);
        // Get the plain object representation of the post
        const post = postData.get({ plain: true });
        // Render the post template with the post data
        res.render('post', { post });
    } catch (err) {
        // Handle errors
        res.status(500).json(err);
    }
});

// Login route
router.get('/login', async (req, res) => {
    try {
        // Check if user is already logged in
        if (req.session.loggedIn) {
            // Redirect to homepage if logged in
            res.redirect('/');
            return;
        }
        // Render the login template
        res.render('login');
    } catch (err) {
        // Handle errors
        res.status(500).json(err);
    }
});

// Signup route
router.get('/signup', async (req, res) => {
    try {
        // Check if user is already logged in
        if (req.session.loggedIn) {
            // Redirect to homepage if logged in
            res.redirect('/');
            return;
        }
        // Render the signup template
        res.render('signup');
    } catch (err) {
        // Handle errors
        res.status(500).json(err);
    }
});

// Export the router
module.exports = router;
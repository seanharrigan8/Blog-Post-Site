// Import required modules
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Define route for creating a new comment
router.post('/', async (req, res) => {
    try {
        // Create a new comment with the provided data
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });

        // Log the newly created comment
        console.log(newComment);

        // Send the newly created comment as a JSON response
        res.json(newComment);

        // Send the newly created comment as a JSON response (repeated line)
        res.json(newComment);
    } catch (err) {
        // Handle any errors that occur during the process
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Define route for getting comments for a specific post
router.get('/post/:id', async (req, res) => {
    try {
        // Find all comments associated with the specified post
        const commentData = await Comment.findAll({
            where: { post_id: req.params.id },
            include: [{ model: User }],
        });

        // Convert the comment data to plain JavaScript objects
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        // Send the comments as a JSON response
        res.status(200).json(comments);
    } catch (err) {
        // Handle any errors that occur during the process
        res.status(500).json(err);
    }
});

// Export the router module
module.exports = router;
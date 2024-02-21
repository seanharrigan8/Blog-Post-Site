const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


//
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('homepage', { posts});
    } catch (err) {
   res.status(500).json(err);
        }
    });


      

//not sure about this one//

// update/delete post show edit page

// add new post page


// postRoutes.js

module.exports = router;
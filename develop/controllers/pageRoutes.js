const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//all blog  posts
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('main', { posts });
        // res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//single blog post
router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


//

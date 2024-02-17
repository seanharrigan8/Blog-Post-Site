const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//all blog  posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//single blog post
router.get('/:id', async (req, res) => {
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

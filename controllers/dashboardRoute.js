const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//
router.get('/', withAuth, async (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//not sure about this one//

// update/delete post show edit page

// add new post page

module.exports = router;
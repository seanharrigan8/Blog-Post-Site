// Import required modules
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
const bcrypt = require("bcrypt");
// Route to get all blog posts

router.get("/", async (req, res) => {
  try {
    // Fetch all blog posts with associated user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });

    // Convert fetched data to plain JavaScript objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage template with the fetched data
    res.render("homepage", { posts, logged_in: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to find a single post by its ID
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Fetch a single post by its ID with associated user and comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["email"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    // Convert fetched data to plain JavaScript object
    const post = postData.get({ plain: true });

    // Render the post template with the fetched data
    res.render("post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get("/login", async (req, res) => {
  try {
    // If user is already logged in, redirect to homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Render the login page
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



// Route to render the signup page
router.get('/signup', async (req, res) => {
  try {
    // If user is already logged in, redirect to homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Render the signup page
    res.render('signup');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// Export the router
module.exports = router;

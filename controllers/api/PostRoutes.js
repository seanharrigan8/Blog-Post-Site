// Import required modules
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts with associated user and comment data
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });

    // Map the fetched data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'posts' view with the fetched data
    res.render('posts', { posts });
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

// Get a specific blog post by ID with authentication
router.get('/:id', withAuth, async (req, res) => {
  try {
    // Find a blog post by ID with associated user and comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    // If no post found with the given ID, return a 404 error
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    // Return the fetched post data
    res.status(200).json(postData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

// Create a new blog post
router.post("/posts", async (req, res) => {
  try {
    // Create a new post with the request body and the user ID from the session
    const newPost = await Post.create({
      ...req.body,
      user_Id: req.session.user_Id,
    });

    // Log the newly created post and send it as a response
    console.log(newPost);
    res.json(newPost);
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Edit an existing blog post
router.put("/:id", async (req, res) => {
  try {
    // Update the post with the request body and the user ID from the session
    const editPost = await Post.update({
      ...req.body,
      user_Id: req.session.user_Id,
    }, {
      where: {
        id: req.params.id,
      },
    });

    // Log the updated post and send it as a response
    console.log(editPost);
    res.json(editPost);
  } catch (err) {
    // Handle server error
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    // Delete the post with the given ID
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Log the deleted post and send it as a response
    console.log("Post Deleted", deletePost);
    res.json(deletePost);
  } catch (err) {
    // Handle server error
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router
module.exports = router;

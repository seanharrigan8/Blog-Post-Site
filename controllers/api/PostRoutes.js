const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");


//all blog posts get route 
// router.get('/', withAuth, async (req, res) => {
//   try {
//       const postData = await Post.findAll({
//           include: [{ model: User }, { model: Comment }],
//       });

//       const posts = postData.map((post) => post.get({ plain: true }));
//       res.render('main', { posts });
//       // res.status(200).json(postData);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

//single blog post get route
// router.get('/:id', withAuth, async (req, res) => {
//   try {
//       const postData = await Post.findByPk(req.params.id, {
//           include: [{ model: User }, { model: Comment }],
//       });
//       if (!postData) {
//           res.status(404).json({ message: 'No post found with this id' });
//           return;
//       }
//       res.status(200).json(postData);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });


//creating a single new blog post //
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newPost);

res.json(newPost);
}  catch (err) {
  res.status(500).json({ error: "Internal Server Error" });

}
});


//edit existing blog post//

router.put("/:id", async (req, res) => {
  try {
    const editPost = await Post.update({
      ...req.body,
      user_id: req.session.user_id,
    }, {
      where: {
        id: req.params.id,
      },
    });
    console.log(editPost);
    res.json(editPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///delete post
router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log("Post Deleted", deletePost);
    res.json(deletePost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
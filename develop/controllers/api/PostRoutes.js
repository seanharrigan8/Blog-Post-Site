const router = require("express").Router();
const { Post, User, Comment } = require("../../models");


router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newPost);

res.json(newPost);
}  catch (err); {
  res.status(500).json({ error: "Internal Server Error" });

}
});


//edit blog post
router.put("/:id", async (req, res) => {
  try {
    const editPost = await Post.update({
      ...req.body,
      user_id: req.session.user_id,
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
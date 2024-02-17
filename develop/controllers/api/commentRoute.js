const router = require('express').Router();
const { Comment } = require('../../models');

//new comment
router.post('/', async (req, res) => {
    try {
  const newComment = await Comment.creat({
    ...req.body, 
    user_id: req.session.user_id,
    post_id: req.body.post_id
  });

  console.log(newComment);

  res.json(newComment);

  res.json(newComment);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error"});
}
});


module.exports = router;
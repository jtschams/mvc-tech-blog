const router = require('express').Router();
const { Comment, Post, User } = require('../../models')

// TODO: Create Comment
router.post('/', async (req, res) => {
  try {
    const commentCreate = await Comment.create({
      body: req.body.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });
    const commentData = commentCreate.get({ plain: true })

    return res.status(200).json(commentData)
  } catch (err) {
    console.log(err);
    return res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (commentData.user_id !== req.session.user_id) {
      return res.status(401).json('You are not authorized to delete this comment.')
    }
    const deletion = await Comment.destroy({ where: { id: req.params.id } })
    if (!deletion) {
      return res.status(400).json('Unable to delete comment.')
    }
    return res.status(200).json('Comment Deleted.')
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
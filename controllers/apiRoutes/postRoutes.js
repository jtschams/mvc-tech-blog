const router = require('express').Router();
const { Post, User } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const postCreate = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id
    });
    const postData = postCreate.get({ plain: true })

    return res.status(200).json(postData)
  } catch (err) {
    console.log(err);
    return res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData.user_id !== req.session.user_id) {
      return res.status(401).json('You are not authorized to edit this post.')
    }
    const update = await Post.update({
        body: req.body.body
      },{
        where: { id: req.params.id }
      }
    )
    if (!update) {
      return res.status(400).json('Unable to edit post.')
    }
    return res.status(200).json(update)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData.user_id !== req.session.user_id) {
      return res.status(401).json('You are not authorized to delete this post.')
    }
    const deletion = await Post.destroy({ where: { id: req.params.id } })
    if (!deletion) {
      return res.status(400).json('Unable to delete post.')
    }
    return res.status(200).json('Post Deleted.')
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
const router = require('express').Router();
const { checkAuth } = require('../../utils/auth.js')
const { Post, Comment } = require('../../models')

router.get('/', async (req, res) => {
    const postData = await Post.findAll();
    const posts = postData.map(post => post.get({ plain:true }));

    return res.render('home', { posts, loggedIn: req.session.loggedIn });
});

router.get('/dashboard', checkAuth, async (req, res) => {
    const postData = await Post.findAll({ where: { user_id: req.session.user_id}});
    const posts = postData.map(post => post.get({ plain:true }));

    return res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/dashboard');
    }

    return res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/dashboard');
    }

    return res.render('signup', { loggedIn: req.session.loggedIn });
});

router.get('/post/:id', checkAuth, async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    const commentData = await Comment.findAll({
        where: { post_id: req.params.id }
    });
    const comments = commentData.map(comment => comment.get({ plain:true }));

    return res.render('single', { post, comments, loggedIn: req.session.loggedIn });
});

module.exports = router;
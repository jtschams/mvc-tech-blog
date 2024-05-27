const router = require('express').Router();
const { checkAuth } = require('../../utils/auth.js')
const { Post, Comment, User } = require('../../models')

router.get('/', async (req, res) => {
    const postData = await Post.findAll({ include: User });
    const posts = postData.map(post => post.get({ plain:true }));

    return res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
});

router.get('/dashboard', checkAuth, async (req, res) => {
    const postData = await Post.findAll({ where: { user_id: req.session.user_id }, include: User });
    const posts = postData.map(post => post.get({ plain:true }));

    return res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
});

router.get('/create', checkAuth, async (req, res) => {

    return res.render('create', { loggedIn: req.session.loggedIn });
});

router.get('/post/:id', checkAuth, async (req, res) => {
    const postData = await Post.findByPk(req.params.id, { include: User });
    const commentData = await Comment.findAll({
        where: { post_id: req.params.id }
    });
    const comments = commentData.map(comment => comment.get({ plain:true }));
    const post= postData.get({plain:true})
    const postOwner = post.user.id === req.session.user_id
    
    return res.render('single', { post, comments, postOwner, loggedIn: req.session.loggedIn });
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

module.exports = router;
const router = require('express').Router();
const { User } = require('../../models')

// TODO:  Store user id under req.session.user_id and req.session.loggedIn

// TODO: Create User
router.post('/', async (req, res) => {
});

// TODO: Login
router.post('/login', async (req, res) => {
});

// TODO: Logout
router.post('/logout', async (req, res) => {
});

module.exports = router;
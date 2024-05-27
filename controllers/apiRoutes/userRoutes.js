const router = require('express').Router();
const { User } = require('../../models')

// Create User
router.post('/signup', async (req, res) => {
    try {
        const userCreate = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const userData = userCreate.get({ plain:true });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id
            
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email }
        });

        if (!userData) {
            return res.status(400).json('Incorrect email or password.');
        }

        const passCheck = await userData.checkPassword(req.body.password);

        if (!passCheck) {
            return res.status(400).json('Incorrect email or password.');
        }

        const plainUser = userData.get({ plain:true })
        req.session.save (() => {
            req.session.loggedIn = true;
            req.session.user_id = plainUser.id;

            return res.status(200).json('Successfully logged in')
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Logout
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
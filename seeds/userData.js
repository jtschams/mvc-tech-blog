const { User } = require('../models');

const userData = [
    {
        name: 'J.T.',
        email: 'jt@email.com',
        password: 'password123'
    },
    {
        name: 'Kim',
        email: 'kim@email.com',
        password: 'password123'
    },
    {
        name: 'Scott',
        email: 'scott@email.com',
        password: 'password123'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers; 
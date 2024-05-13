const { Comment } = require('../models');

const commentData = [
    {
        body: 'Cool!',
        user_id: 2,
        post_id: 1
    },
    {
        body: 'Nice!',
        user_id: 3,
        post_id: 1
    },
    {
        body: 'I see!',
        user_id: 1,
        post_id: 2
    },
    {
        body: 'Interesting!',
        user_id: 3,
        post_id: 2
    },
    {
        body: 'Amazing!',
        user_id: 2,
        post_id: 3
    },
    {
        body: 'y tho',
        user_id: 3,
        post_id: 3
    },
    {
        body: 'Cool!',
        user_id: 1,
        post_id: 4
    },
];

const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments;
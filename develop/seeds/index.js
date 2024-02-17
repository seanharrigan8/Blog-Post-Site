const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
    console.log('seeded users successfully');

    await seedPosts();
    console.log('seeded posts successfully');

    await seedComments();
    console.log('seeded comments successfully');

    process.exit(0);

};

seedAll();
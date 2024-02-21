// seed.js

const User = require('../models/User');
const Post = require('../models/Post');


async function seedDatabase() {
  await User.create({
    username: 'testuser',
    password: 'testpassword',
    email: 'testuser@example.com'
  });

  await Post.create({
    id: 1,
    title: 'Test Post',
    content: 'This is a test post.',
    // Replace '1' with the ID of the user you just created
    user_Id: 1,
  });

  console.log('Database seeded!');
}

seedDatabase();
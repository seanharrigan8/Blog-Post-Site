// seed.js

const User = require('../models/User');
const Post = require('../models/Post');

async function seedDatabase() {
  const user = await User.findOne({ where: { email: 'testuser@example.com' } });
  if (!user) {
    await User.create({
      user_Id: 1,
      password: 'testpassword',
      email: 'testuser@example.com'
    });
  }

  await Post.sync();

  const post = await Post.findOne({ where: { id: 1 } });
  if (!post) {
    await Post.create({
      id: 1,
      title: 'Test Post',
      content: 'This is a test post.',
      user_Id: user.id,
    });
  }

  console.log('Database seeded!');
}

seedDatabase();
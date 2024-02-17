const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
// const expressHandlebars = require('express-handlebars');

// Express App
const router = require('express').Router();

router.use(express.json());
router.use(session({ secret: 'secret key', resave: false, saveUninitialized: false }));
// app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

//Sequelize models
const sequelize = new Sequelize('database', 'username', 'password', { dialect: 'mysql' });
const User = sequelize.define('user', { username: Sequelize.STRING, password: Sequelize.STRING });

//route for sign up
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashhedPassword = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashedPassword });
    res.redirect('/login');
});


router.get('/login', (req, res) => res.render('login'));
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.redirect('/login');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.redirect('/login');
    req.session.userId = user.id;
    res.redirect('/dashboard');
});
router.get('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect('/login');
});

module.exports = router;
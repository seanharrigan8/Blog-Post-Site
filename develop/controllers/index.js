const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const expressHandlebars = require('express-handlebars');

// Express App
const app = express();

app.use(express.json());
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: false }));
app.engine('handlebars', expressHandlebars({ degaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Sequelize models
const sequelize = new Sequelize('database', 'username', 'password', { dialect: 'mysql' });
const User = sequelize.define('user', { username: Sequelize.STRING, password: Sequelize.STRING });

//route for sign up
app.get('/signup', (req, res) => res.render('signup'));
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashhedPassword = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashedPassword });
    res.redirect('/login');
});


app.get('/login', (req, res) => res.render('login'));
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.redirect('/login');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.redirect('/login');
    req.session.userId = user.id;
    res.redirect('/dashboard');
});
app.get('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect('/login');
});

app.listen(3000);
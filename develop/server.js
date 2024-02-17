const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const expressHandlebars = require('express-handlebars').engine;
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

//set up the routes to use
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


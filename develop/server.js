const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.usep(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//set up the routes to use
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const expressHandlebars = require("express-handlebars");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const hbs = expressHandlebars.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

//set up the routes to use
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

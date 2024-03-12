const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./public/utils/helpers');
const pageRoutes = require('./controllers/pageRoutes');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({
  helpers: {
    formatDate: helpers.formatDate,
  },
});

{
//       formatYear: function(date) {
//           return new Date(date).getFullYear();
//       },
//       formatDate: function(date) {
//         const d = new Date(date);
//         const day = String(d.getDate()).padStart(2, '0');
// const month = String(d.getMonth() + 1).padStart(2, '0');  
// const year = d.getFullYear();
// return `${month}/${day}/${year}`;
//       }
//   }
// });
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars' , hbs.engine);
app.set('view engine', 'handlebars');
app.use('/', pageRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`); 
});
}
);
}

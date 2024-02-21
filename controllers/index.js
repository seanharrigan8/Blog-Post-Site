
const router = require ('express').Router();
const apiRoutes = require('./api');
const pageRoutes = require('./pageRoutes');
const dashboardRoutes = require('./dashboardRoutes');


router.use('/api', apiRoutes);

router.use('/dashboard', dashboardRoutes);
router.use('/', pageRoutes);

module.exports = router;







// //Sequelize models
// const sequelize = new Sequelize('database', 'username', 'password', { dialect: 'mysql' });
// const User = sequelize.define('user', { username: Sequelize.STRING, password: Sequelize.STRING });







module.exports = router;

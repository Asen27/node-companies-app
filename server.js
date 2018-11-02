const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
var companyController = require('./app/controllers/company.controller.js');
var userController = require('./app/controllers/user.controller.js');
const authController = require('./app/controllers/auth.js');


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Use the passport package in our application
app.use(passport.initialize());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /companies
router.route('/companies')
  .post(authController.isAuthenticated, companyController.create)
  .get(authController.isAuthenticated, companyController.findAll);

// Create endpoint handlers for /companies/:company_id
router.route('/companies/:companyId')
  .get(authController.isAuthenticated, companyController.findOne)
  .put(authController.isAuthenticated, companyController.update)
  .delete(authController.isAuthenticated, companyController.delete);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
var companyController = require('../app/controllers/company.controller.js');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');



// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('../config/database.config.js');
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


const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://asen27.eu.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: '7BPlW4Jm8ztKXz19HUEB18dcIyHiiVGO',
    issuer: `https://asen27.eu.auth0.com/`,
    algorithms: ['RS256']
  });

// Create our Express router
var router = express.Router();


// Create endpoint handlers for /companies
router.route('/companies')
  .post(checkJwt, companyController.create)
  .get(companyController.findAll);

// Create endpoint handlers for /companies/:company_id
router.route('/companies/:companyId')
  .get(companyController.findOne)
  .put(companyController.update)
  .delete(companyController.delete);


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  

// Register all our routes with /api
app.use('/api', router);

// listen for requests
app.listen(process.env.PORT || 8081, () => {
    console.log("Server is listening on port 8081");
});
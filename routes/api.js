var express = require('express');
var app = express();
var router = express.Router();
const passport = require('../proxy/passport');

const login = require('./api/login');

module.exports = function(app) {

  app.use('/api/login', login);
};

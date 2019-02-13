var express = require('express');
var router = express.Router();
const passport = require('../../proxy/passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res);
  // passport

  res.render('index', {title: '88'});
});

module.exports = router;

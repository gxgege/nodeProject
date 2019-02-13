var express = require('express');
var router = express.Router();
const possport = require('../../controllers/passport.js');
/* GET users listing. */
router.post('/', possport.login);

module.exports = router;

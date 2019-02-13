const config = require('../config/config');
const jwt = require('jsonwebtoken');  //用来生成token
module.exports = {
  sign: function(content) {
    // 要生成token的主题信息
    return jwt.sign(content, config.secretOrPrivateKey, {
      expiresIn: 60 * 60 * 1  // 1小时过期
    });
  },
  verify: function(token, callback) {
    jwt.verify(token, config.secretOrPrivateKey, callback);
  },
};
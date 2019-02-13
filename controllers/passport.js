var token = require('../tools/token.js');
var passport = require('../proxy/passport.js');
module.exports = {
  login(req, res, next) {
    passport.findUser(req.body, (error, result) => {
      let {username, password} = req.body;
      let msg = '';
      let code = 0;
      if (result.length < 1) {
        msg = '用户名或密码不正确';
        code = 1;
      } else {
        result = token.sign(req.body);
        _client.set(result, JSON.stringify(req.body));
        console.log('1', _client.get(result, (err, value) => {
          console.log('value', err, value);
        }));

      }

      //生成token
      res.send(_util.sendHandle(result, error, msg, code));
    });
  },
};
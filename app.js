var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var db = require('./config/mongdb/possportDB');
var jwt = require('./tools/token.js');
const log4js = require('./config/log4.js');
const config = require('./config/config');
const _util = require('./tools/utils.js');
const client = require('./tools/client.js');

global._util = _util;
global._client = client;
// import history from 'connect-history-api-fallback'; //就是让你的单页面路由处理更自然（比如vue-router的mode设置为html5时）参考地址：https://github.com/bripkens/connect-history-api-fallback

var api = require('./routes/api.js');

var app = express();
log4js.useLogger(app);// 把每次请求的信息写入日志
// app.use(history());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true); //可以带Cookies
  res.header('X-Powered-By', '3.2.1');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

//保存token对应的值
let token = {};
//拦截token
app.all('*', (req, res, next) => {
  console.log(token);
  if (config.unToken.includes(req.url.split('?')[0])) {
    res.send({'status': 10010});
  } else {
    next();
  }
  /*let token = req.get("Authorization"); // 从Authorization中获取token
  jwt.verify(token, (err, decode)=> {
    if (err) {  //  时间失效的时候 || 伪造的token
      res.send({'status':10010});
    } else {
      res.send({'status':10000});
    }
  })*/

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//注册路由
api(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/**
 * mongoDB数据库配置
 */
'use strict';

import mongoose from 'mongoose';
import log from '../log4.js'; //自定义日志文件，后面我们将会说明
const logger = log.getLogger('default');//根据需要获取logger
const errlogger = log.getLogger('err');
const othlogger = log.getLogger('oth');
const db = mongoose.createConnection('mongodb://@localhost:27017/possport',
    {auto_reconnect: true, useNewUrlParser: true});
// mongoose.connect('',{auto_reconnect: true, useNewUrlParser:true});
// mongoose.Promise = global.Promise;
console.log();
// const db = mongoose.connection;
db.once('open', () => {
  console.log('======mongooDB数据库连接成功======');
  logger.info('mongooDB数据库连接成功.端口号：' + 27017); //自定义日志存储
});

db.on('error', function(error) {
  console.error('mongooDB数据库连接错误：' + error);
  errlogger.error('mongooDB数据库连接错误.' + error); //自定义日志存储
  mongoose.disconnect();
});

db.on('close', function() {
  console.log('mongooDB数据库断开，请重新连接.');
  logger.trace('mongooDB数据库断开，请重新连接.');
  mongoose.connect(27017, {server: {auto_reconnect: true}});
});
global.mongodb = Object.assign(global.mongodb || {}, {possport: db});

export default db;

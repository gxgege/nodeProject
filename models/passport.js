/*
* 人员信息表
* */
import log from '../config/log4.js'; //自定义日志文件，后面我们将会说明
const logger = log.getLogger('default');//根据需要获取logger
const errlogger = log.getLogger('err');

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let passportSchema = new Schema({
  name: String,
  sex: {
    type: String,
    enum: ['BOY', 'GIRL'],
  },
  accountNumber: String,
  role: String,
  password: String,

}, {timestamps: true});
let passportModel = mongodb.possport.model('user', passportSchema);

passportModel.events.on('error', err => {
  console.log(err.message);
  errlogger.error(err.message);
});

module.exports.passportModel = passportModel;
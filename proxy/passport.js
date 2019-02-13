/*
* 人员信息表 数据库操作
* */
let passportModel = require('../models/passport').passportModel;

// passportModel.find({})
/**查找匹配的元素
 * */
function findUser(obj, callBack) {
  passportModel.find({accountNumber: obj.username, password: obj.password},
      (error, mess) => {
        callBack(error, mess);
      });

}

function insert() {

  var user = new passportModel({
    name: 'Tracy McGrady',                 //用户账号
    sex: 'BOY',                            //密码
    AccountNumber: 37,                                //账号
  });

  user.save(function(err, res) {
    if (err) {
      console.log('Error:' + err);
    }
    else {
      console.log('Res:' + res);
    }

  });
}

// passportModel.estimatedDocumentCount({name: 'Tracy McGrady'},
//     function(err, count) {
//       console.log('there are %d jungle adventures', err, count);
//     });
// passportModel.findByIdAndUpdate('5c32cc8e5a037a14d4334be6', {'name': 'f'},
//     function(err, res) {
//       if (err) {
//         console.log('Error:' + err);
//       }
//       else {
//         console.log('Res:' + res);
//       }
//
//     });

module.exports = {
  findUser,
};

insert();
let _util = {
  sendHandle(data = '', error, mes = 0, code = '') {
    if (error) {
      return {data: error, 'status': {'code': '999', 'msg': '系统异常'}};
    }
    return {data: data, 'status': {'code': code + '', 'msg': mes}};
  },

};
module.exports = _util;


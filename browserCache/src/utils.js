const moment = require('moment');
const crypto = require('crypto');

// GMT 格式时间转化
exports.getGMT = (second = 10) => `${moment().utc().add(second, 's').format('ddd, DD MMM YYYY HH:mm:ss')} GMT`;

// 创建 md5 加密
exports.cryptoFile = (file) => {
  const md5 = crypto.createHash('md5');
  return md5.update(file).digest('hex');
}

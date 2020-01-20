const moment = require('moment');

const getGMT = () => `${moment().utc().add(10, 's').format('ddd, DD MMM YYYY HH:mm:ss')} GMT`;

module.exports = (req, res) => {
  res.setHeader('Expires', getGMT());
  res.end('ok');
}

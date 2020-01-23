const { getGMT } = require('./utils')

module.exports = (req, res) => {
  res.setHeader('Expires', getGMT(10));
  res.end('ok');
}

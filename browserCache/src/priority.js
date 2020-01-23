// 优先级
const { getGMT } = require('./utils')

// Pragma > Cache-Control
exports.priority1 = (req, res) => {
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'public,max-age=1000');
  res.end('ok');
}

// Cache-Control > Expries
exports.priority2 = (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Expries', getGMT(1000))
  res.end('ok');
}

// pragma 请求头部
exports.request = (req, res) => {
  res.setHeader('Cache-Control', 'public,max-age=1000')
  res.end('ok')
}

// pragma 响应头部
exports.response = (req, res) => {
  res.setHeader('Pragma', 'no-cache')
  // res.setHeader('Cache-Control', 'public,max-age=1000')
  res.end('ok')
}
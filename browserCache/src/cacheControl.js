module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'public,max-age=10')
  res.end('ok')
}

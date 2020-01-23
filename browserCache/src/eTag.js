const fs = require('fs');
const path = require('path');
const { cryptoFile } = require('./utils')

const filePath = path.join(__dirname, '../static/index.html')

module.exports = (req, res) => {
  const file = fs.readFileSync(filePath);
  const eTag = cryptoFile(file)

  res.setHeader('Cache-Control', 'public,max-age=10');

  if (eTag === req.headers['if-none-match']) {
    res.writeHead(304, 'Not Modified');
    res.end();
  } else {
    res.setHeader('ETag', eTag);
    res.writeHead(200, 'OK');
    res.end(file);
  }
}

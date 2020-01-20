const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const filePath = path.join(__dirname, '../static/index.html')

const cryptoFile = (file) => {
  const md5 = crypto.createHash('md5');
  return md5.update(file).digest('hex');
}

module.exports = (req, res) => {
  const file = fs.readFileSync(filePath);
  const eTag = cryptoFile(file)

  if (eTag === req.headers['if-none-match']) {
    res.writeHead(304, 'Not Modified');
    res.end();
  } else {
    res.setHeader('Cache-Control', 'public,max-age=10');
    res.setHeader('ETag', eTag);
    res.writeHead(200, 'OK');
    res.end(file);
  }
}

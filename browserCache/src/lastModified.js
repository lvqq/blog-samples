const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../static/index.html')

module.exports = (req, res) => {
  const stat = fs.statSync(filePath);
  const file = fs.readFileSync(filePath);
  const lastModified = stat.mtime.toUTCString();

  if (lastModified === req.headers['if-modified-since']) {
    res.writeHead(304, 'Not Modified');
    res.end();
  } else {
    res.setHeader('Cache-Control', 'public,max-age=10');
    res.setHeader('Last-Modified', lastModified);
    res.writeHead(200, 'OK');
    res.end(file);
  }
}

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 2200;

app.get('/', (req, res) => res.end(fs.readFileSync(path.join(__dirname, './static/index.html'))));

app.get('/expries', require('./src/expries'));
app.get('/cacheControl', require('./src/cacheControl'));
app.get('/lastModified', require('./src/lastModified'));
app.get('/eTag', require('./src/eTag'))

app.listen(port, () => {
  console.log(`server running on port ${port}!`);
})

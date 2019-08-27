const express = require('express');
const path = require('path');
const log = require('fancy-log');

const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, log(`Project is running at port: ${port}`));

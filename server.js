const express = require('express');
const db = require('./config/db');
const path = require('path');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '/public')));

require('./app/routes')(app, {});

app.listen(port, () => {
  console.log({ "Live": port });
});

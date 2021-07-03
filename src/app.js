const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json('working');
});

app.use(express.json());

module.exports = app;

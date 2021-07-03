const artistRouter = require('./routes/artist');
const express = require('express');

const app = express();

app.use(express.json());

app.use('/artist', artistRouter);

module.exports = app;

const artistRouter = require('./routes/artist'); 
const albumRouter = require('./routes/album');
const express = require('express');

const app = express();

app.use(express.json());

app.use('/artist', artistRouter);
app.use('/', albumRouter);

module.exports = app;

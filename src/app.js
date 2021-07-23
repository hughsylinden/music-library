const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const express = require('express');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());

app.use('/artist', artistRouter);
app.use('/album', albumRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;

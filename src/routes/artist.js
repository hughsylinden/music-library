const artistController = require('../controllers/artist');
const express = require('express');

const artistRouter = express.Router();

artistRouter.post('/', artistController.create);
artistRouter.get('/', artistController.read);

module.exports = artistRouter;

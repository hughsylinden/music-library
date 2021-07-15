const artistController = require('../controllers/artist');
const express = require('express');

const artistRouter = express.Router();

artistRouter.post('/', artistController.create); 
artistRouter.get('/', artistController.read);
artistRouter.get('/:artistId', artistController.readOne);
artistRouter.patch('/:artistId', artistController.update);
artistRouter.delete('/:artistId', artistController.destroy);

module.exports = artistRouter;

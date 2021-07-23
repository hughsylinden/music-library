const albumController = require('../controllers/album');
const express = require('express');

const albumRouter = express.Router();

albumRouter.get('/', albumController.read);
albumRouter.get('/:albumId', albumController.readOne);
albumRouter.patch('/:albumId', albumController.update);
albumRouter.delete('/:albumId', albumController.destroy);

module.exports = albumRouter;

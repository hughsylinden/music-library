const albumController = require('../controllers/album');
const express = require('express');

const albumRouter = express.Router();

albumRouter.post('/artist/:artistId/album', albumController.create);
albumRouter.get('/album', albumController.read);
albumRouter.get('/album/:albumId', albumController.readOne);
albumRouter.patch('/album/:albumId', albumController.update);
albumRouter.delete('/album/:albumId', albumController.destroy);

module.exports = albumRouter;

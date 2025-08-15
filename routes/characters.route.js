const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/characters.controller')

router.get('/getCharacters', charactersController.findAll);
router.get('/findById/:id', charactersController.findById);
router.get('/findByIdArtefact/:id', charactersController.findByIdArtefact);

module.exports = router;

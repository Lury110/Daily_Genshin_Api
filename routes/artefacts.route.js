const express = require('express');
const router = express.Router();
const artefactsController = require('../controllers/artefacts.controller')

router.get('/getArtefacts', artefactsController.findAll);
router.get('/findById/:id', artefactsController.findById);

module.exports = router;

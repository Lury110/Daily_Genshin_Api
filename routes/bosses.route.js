const express = require('express');
const router = express.Router();
const bossesController = require('../controllers/bosses.controller')
// const checkParams = require('../middleware/middlewareParams')

router.get('/getbosses', bossesController.findAll);
router.get('/findById/:id', bossesController.findById);
router.get('/findBossByIdCharacter/:id', bossesController.findBossByIdCharacter);
router.get('/findWBossByIdCharacter/:id', bossesController.findWBossByIdCharacter);

module.exports = router;

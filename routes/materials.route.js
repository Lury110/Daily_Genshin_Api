const express = require('express');
const router = express.Router();
const materialsController = require('../controllers/materials.controller')

router.get('/getmaterials', materialsController.findAll);
router.get('/findById/:id', materialsController.findById);
router.get('/findByIdCharacter/:id', materialsController.findByIdCharacter);
router.get('/findByIdWeapon/:id', materialsController.findByIdWeapon);
router.get('/findWeaponById/:id', materialsController.findWeaponById);
router.get('/findCharactersById/:id', materialsController.findCharactersById);

module.exports = router;

const express = require('express');
const router = express.Router();
const weaponsController = require('../controllers/weapons.controller')

router.get('/getWeapons', weaponsController.findAll);
router.get('/findById/:id', weaponsController.findById);

module.exports = router;

const Material = require('../models/materials.mysql');

exports.findAll = (req,res) => {
    Material.findAll((err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findById = (req,res) => {
    Material.findById(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findByIdCharacter = (req,res) => {
    Material.findByIdCharacter(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findByIdWeapon = (req,res) => {
    Material.findByIdWeapon(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findWeaponById = (req,res) => {
    Material.findWeaponById(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findCharactersById = (req,res) => {
    Material.findCharactersById(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}
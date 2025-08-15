const Weapon = require('../models/weapons.mysql');

exports.findAll = (req,res) => {
    Weapon.findAll((err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findById = (req,res) => {
    Weapon.findById(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

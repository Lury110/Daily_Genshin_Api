const Bosses = require('../models/bosses.mysql');

exports.findAll = (req,res) => {
    Bosses.findAll((err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findById = (req,res) => {
    Bosses.findById(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findBossByIdCharacter = (req,res) => {
    Bosses.findBossByIdCharacter(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findWBossByIdCharacter = (req,res) => {
    Bosses.findWBossByIdCharacter(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

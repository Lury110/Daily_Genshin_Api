const Character = require('../models/characters.mysql');

exports.findAll = (req,res) => {
    Character.findAll((err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findById = (req,res) => {
    Character.findById(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findByIdArtefact = (req,res) => {
    Character.findByIdArtefact(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

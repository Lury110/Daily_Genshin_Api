const Artefact = require('../models/artefacts.mysql');

exports.findAll = (req,res) => {
    Artefact.findAll((err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

exports.findById = (req,res) => {
    Artefact.findById(req.params.id,(err,data )=> {
        if(err) {
            res.status(500).send({
                message : err
            })
        }
        res.json(data)
    })
}

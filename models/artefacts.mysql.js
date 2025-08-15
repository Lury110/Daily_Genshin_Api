const sql = require('../db');

const Artefacts = function (item) {
    this.name = item.name;
    this.rarity = item.rarity;
    this.bonus2 = item.bonus2;
    this.bonus4 = item.bonus4;
}

Artefacts.findAll = (result) => {
    sql.query('SELECT * FROM artefacts', (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici vos artéfacts' , res);
        result(null,res);
    })
}

Artefacts.findById = (id, result) => {
    sql.query('SELECT * FROM artefacts WHERE id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici votre artéfact' , res);
        result(null,res);
    })
}

module.exports = Artefacts;

const sql = require('../db');

const Characters = function (item) {
    this.name = item.name;
    this.rarity = item.rarity;
    this.element = item.element;
    this.weapon = item.weapon;
    this.region = item.region;
    this.description = item.description;
    this.weapon_id = item.weapon_id;
    this.artefact_id = item.artefact_id;
}

Characters.findAll = (result) => {
    sql.query('SELECT * FROM characters', (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        result(null,res);
    })
}

Characters.findById = (id, result) => {
    sql.query('SELECT * FROM characters WHERE id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici votre personnage' , res);
        result(null,res);
    })
}

Characters.findByIdArtefact = (id, result) => {
    sql.query('SELECT * FROM characters WHERE artefact_id = ? ORDER BY RAND() LIMIT 4', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici vos personnage' , res);
        result(null,res);
    })
}

module.exports = Characters;

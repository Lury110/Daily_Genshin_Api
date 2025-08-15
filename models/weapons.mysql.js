const sql = require('../db');

const Weapons = function (item) {
    this.name = item.name;
    this.rarity = item.rarity;
    this.type = item.type;
    this.seg_stat = item.seg_stat;
    this.description = item.description;
    this.passif = item.passif;
    this.obtain = item.obtain;
}

Weapons.findAll = (result) => {
    sql.query('SELECT * FROM weapons', (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici vos armes' , res);
        result(null,res);
    })
}

Weapons.findById = (id, result) => {
    sql.query('SELECT * FROM weapons WHERE id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici votre arme' , res);
        result(null,res);
    })
}

module.exports = Weapons;

const sql = require('../db');

const Materials = function (item) {
    this.name = item.name;
    this.type = item.type;
    this.time = item.time;materiaux
}

Materials.findAll = (result) => {
    sql.query('SELECT * FROM materials', (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici vos materiaux' , res);
        result(null,res);
    })
}

Materials.findById = (id, result) => {
    sql.query('SELECT * FROM materials WHERE id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici votre item' , res);
        result(null,res);
    })
}

Materials.findByIdCharacter = (id, result) => {
    sql.query('SELECT m.* FROM character_ability_materials cam JOIN materials m ON cam.material_id = m.id WHERE cam.character_id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici votre item' , res);
        result(null,res);
    })
}

Materials.findByIdWeapon = (id, result) => {
    sql.query('SELECT m.* FROM weapon_elevating_materials cam JOIN materials m ON cam.material_id = m.id WHERE cam.weapon_id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici votre item' , res);
        result(null,res);
    })
}

Materials.findWeaponById = (id, result) => {
    sql.query('SELECT w.* FROM weapon_elevating_materials wem JOIN weapons w ON wem.weapon_id = w.id WHERE wem.material_id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici votre item' , res);
        result(null,res);
    })
}

Materials.findCharactersById = (id, result) => {
    sql.query('SELECT w.* FROM character_ability_materials wem JOIN characters w ON wem.character_id = w.id WHERE wem.material_id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici votre item' , res);
        result(null,res);
    })
}


module.exports = Materials;

const sql = require('../db');

const Bosses = function (item) {
    this.name = item.name;
    this.type = item.type;bosses
}

Bosses.findAll = (result) => {
    sql.query('SELECT * FROM bosses', (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici vos bosses' , res);
        result(null,res);
    })
}

Bosses.findById = (id, result) => {
    sql.query('SELECT * FROM bosses WHERE id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici vos bosses' , res);
        result(null,res);
    })
}

Bosses.findBossByIdCharacter = (id, result) => {
    sql.query('SELECT bd.* FROM character_boss_drops cbd JOIN boss_drops bd ON cbd.boss_drop_id = bd.id WHERE cbd.character_id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici vos bosses' , res);
        result(null,res);
    })
}

Bosses.findWBossByIdCharacter = (id, result) => {
    sql.query('SELECT bd.* FROM character_weekly_boss_drops cbd JOIN boss_drops bd ON cbd.weekly_boss_drop_id = bd.id WHERE cbd.character_id = ?', [id], (err,res) => {
        if(err){
            console.log('Erreur',err)
            result(err,null);
            return
        }
        // console.log('Voici vos bosses' , res);
        result(null,res);
    })
}


module.exports = Bosses;

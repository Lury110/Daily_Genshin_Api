const mysql = require('mysql')

const connection =
    mysql.createConnection({
        host: 'localhost',
        user:'root',
        password:'',
        database : 'daily_genshin'
    })

connection.connect(err => {
    if(err) throw err;
    console.log('Ma BDD est connecté')
})

module.exports = connection;

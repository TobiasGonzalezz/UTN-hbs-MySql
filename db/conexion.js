const mysql = require('mysql2')

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

conexion.connect((err) => {
    if (err) throw err;
    console.log(`Sucessful Conection`)
})

module.exports = conexion
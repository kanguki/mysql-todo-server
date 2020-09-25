const mysql = require('mysql')
require('dotenv').config()

const conn = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.MYSQL_PASS,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
})

conn.getConnection(err => {
    if (err) console.log(err)
    console.log(`Successfully connect to db ${process.env.DATABASE}`)
})

module.exports = conn
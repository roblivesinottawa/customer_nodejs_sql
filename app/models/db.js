const mysql = require('mysql')
const dbConfig = require('../config/db.config')

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})



connection.connect(err => {
    if(err) throw err
    console.log('Successfully connected to database!')
    let sql = `CREATE TABLE IF NOT EXISTS 'customers' (
        id int(11) NOT NULL PRIARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT false
    ) ENGINE=InnoDB DEFAULT CHARSET=utf-8`;
    connection.query(sql, (err, result) => err ? err : console.log('TABLE CREATED'))
})

module.exports = connection;
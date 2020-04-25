const mysql = require ("mysql")
const inqurier = require ("inquirer")

var connection = mysql.createConnection({
    host: "local host",
    password: "K!rby0414",
    user: "root",
    PORT : 3308,
    database: ""
})

connection.connect(function(err){
    if (err) throw err 
    console.log(`connected as ${connection.threadId} + \n`)
})


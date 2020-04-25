
const mysql = require("mysql")
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "K!rby0414",
    database: 'employeetrackerDB'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as ${connection.threadId}`)
})

const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do',
            choices: ["View","Add","Update employee roles","Quit"],
            name: 'chosen'
        }
    ]).then(answer => {
        switch (answer) {
            case "View":
                return view()
            case "Add":
                return add()
            case "Update employee roles":
                return updateEmployeeRole()
            default:
                connection.end()
        }
    })
}

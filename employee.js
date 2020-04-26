
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
    ]).then(({chosen}) => {
        switch (chosen) {
            case "View":
                console.log('test')
                return view()
            case "Add":
                return add()
            case "Update employee roles":
                return updateEmployeeRole()
            default:
                console.log('im in default hell')
                connection.end()
        }
    })
}
menu()

function view(){
    inquirer.prompt([
        {
            type:"list",
            name: "type",
            message: "Which would you like to view?",
            choices: ["department","role","employee"]
        }
    ]).then(({type}) => {
        console.log(`Selecting all ${type}s \n`);
        connection.query("SELECT * FROM " + type, function(err, res) {
        if (err) throw err;
        console.log(res);
        menu()
  });
    })
}

function add(){
    inquirer.prompt([
        {
            type:"list",
            name:"type",
            message: "Which would you like to add to?",
            choices:["department","role","employee"]
        }
    ]).then(({type}) => {
        switch (type){
            case "department":
                inquirer.prompt([
                    {
                        name:"name",
                        message: "What is the name of the new department"
                    }
                ]).then(({name}) => {
                    connection.query(`INSERT INTO ${type} SET ?`, 
                    {
                        name: name
                    }, function(err,res){
                        if (err) throw err
                        console.log( name + ' was added')
                    })
                    menu()
                })
            case "role":
                inquirer.prompt([
                    {
                        name: "title",
                        message: "What is the title of this role?"
                    },
                    {
                        name: "salary",
                        message: "What it the yearly salary of this role? No more than 8 numbers and 2 decimals: ",
                        validate: function(value){
                            return parseInt(value) && value >= 1 && value <= 10000000
                        }
                    },
                    {
                        name: "department_id",
                        message: "Please enter the corresponding department id",
                        validate: function(value){
                            return parseInt(value) && value >= 1
                        }
                    }
                ]).then((answer) => {
                    connection.query(`INSERT INTO ${type} SET ?`, 
                    {
                        title : answer.title,
                        salary : answer.salary,
                        department_id : answer.department_id
                    }, function(err,res){
                        if (err) throw err
                        console.log( type + ' was added')
                    })
                    menu()
                })
            case "employee":
                inquirer.prompt([
                    {
                        name: "first_name",
                        message: "please enter the employee's first name"
                    },
                    {
                        name: "last_name",
                        message: "please enter the employee's last name"
                    },
                    {
                        name: "role_id",
                        message: "Please enter the role id this employee is associated with"
                    },
                    {
                        name: "manager_id",
                        message: "please enter the employee id of a manager or null"
                    }
                ]).then((answer) => {
                    connection.query(`INSERT INTO ${type} SET ?`, 
                    {
                        first_name : answer.first_name,
                        last_name : answer.last_name,
                        role_id : answer.role_id,
                        manager_id : answer.manager_id
                    }, function(err,res){
                        if (err) throw err
                        console.log( type + ' was added')
                    })
                    menu()

                })
                
        }
    })
}
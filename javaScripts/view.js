const inquirer = require("inquirer");


function view(){
    inquirer.prompt([
        {
            type:"list",
            name: "type",
            message: "Which would you like to view?",
            choices: ["Departments","Roles","Employees"]
        }
    ]).then(type => {
        console.log("Selecting all products...\n");
        connection.query("SELECT * FROM" + type, function(err, res) {
        if (err) throw err;
        console.log(res);
  });
    })
}

view()
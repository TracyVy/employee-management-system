const inquirer = require("inquirer");
const connection = require("./connection");
const { viewAllDept, viewAllRoles, viewAllEmps } = require("./view");
const { addDept, addRole, addEmp } = require("./add");

const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "menuChoice",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Delete an employee",
        "Quit",
      ],
    })
    .then(({ menuChoice }) => {
      switch (menuChoice) {
        case "View all departments":
          viewAllDept().then((res) => {
            res.forEach((element) => {
              console.log(element.name);
            });
            mainMenu();
          });
          break;

        case "View all roles":
          viewAllRoles().then((res) => {
            res.forEach((element) => {
              console.log(element.title);
            });
            mainMenu();
          });
          break;

        case "View all employees":
          viewAllEmps().then((res) => {
            res.forEach((element) => {
              console.log(element.first_name, element.last_name);
            });
            mainMenu();
          });
          break;

        case "Add a department":
          addDept();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmp();
          break;

        case "Update an employee role":
          updateEmpRole();
          break;

        case "Delete an employee":
          deleteEmp();
          break;

        default:
          connection.end();
          process.exit();
          break;
      }
    });
};

mainMenu();

// Update an employee role
const updateEmpRole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "empChoice",
        message: "Which employee needs his/her role changed?",
        choices: [
          "John Doe",
          "Mike Chan",
          "Ashely Rodriguez",
          "Kevin Tupik",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen",
        ],
      },
      {
        type: "list",
        name: "chosenRole",
        message: "What role will this employee have?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
    ])
    .then(({ empChoice, chosenRole }) => {
      if (empChoice == "John Doe") {
        empId = "1";
      } else if (empChoice == "Mike Chan") {
        empId = "2";
      } else if (empChoice == "Ashley Rodriguez") {
        empId = "3";
      } else if (empChoice == "Kevin Tupik") {
        empId = "4";
      } else if (empChoice == "Malia Brown") {
        empId = "6";
      } else if (empChoice == "Sarah Lourd") {
        empId = "7";
      } else if (empChoice == "Tom Allen") {
        empId = "8";
      }
      if (chosenRole == "Sales Lead") {
        role_id = "1";
      } else if (chosenRole == "Salesperson") {
        role_id = "2";
      } else if (chosenRole == "Lead Engineer") {
        role_id = "3";
      } else if (chosenRole == "Software Engineer") {
        role_id = "4";
      } else if (chosenRole == "Accountant") {
        role_id = "5";
      } else if (chosenRole == "Legal Team Lead") {
        role_id = "6";
      } else if (chosenRole == "Lawyer") {
        role_id = "7";
      }
      return new Promise((resolve, reject) => {
        connection.query(
          `UPDATE employee SET role_id = ${role_id} WHERE id = ${empId}`,
          [
            {
              id: empId,
              role_id: role_id,
            },
          ],
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve({ msg: "An employee's role has been updated." });
            }
          }
        );
      });
    });
};

// Delete an employee
const deleteEmp = () => {
  inquirer
    .prompt({
      type: "list",
      name: "empChoice",
      message: "Which employee needs his/her role changed?",
      choices: [
        "John Doe",
        "Mike Chan",
        "Ashely Rodriguez",
        "Kevin Tupik",
        "Malia Brown",
        "Sarah Lourd",
        "Tom Allen",
      ],
    })
    .then(({ empChoice }) => {
      if (empChoice == "John Doe") {
        empId = "1";
      } else if (empChoice == "Mike Chan") {
        empId = "2";
      } else if (empChoice == "Ashley Rodriguez") {
        empId = "3";
      } else if (empChoice == "Kevin Tupik") {
        empId = "4";
      } else if (empChoice == "Malia Brown") {
        empId = "6";
      } else if (empChoice == "Sarah Lourd") {
        empId = "7";
      } else if (empChoice == "Tom Allen") {
        empId = "8";
      }
      return new Promise((resolve, reject) => {
        connection.query(
          "DELETE FROM employee WHERE ?",
          [{ id: empId }],
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve({ msg: "An employee has been deleted." });
            }
          }
        );
      });
    });
};

module.exports = { mainMenu };

// const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require("console.table");
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
      console.log(menuChoice);
      switch (menuChoice) {
        case "View all departments":
          viewAllDept().then((res) => {
            res.forEach((element) => {
              console.log(element);
            });
            mainMenu();
          });
          break;

        case "View all roles":
          viewAllRoles().then((res) => {
            res.forEach((element) => {
              console.log(element);
            });
            mainMenu();
          });
          break;

        case "View all employees":
          viewAllEmps().then((res) => {
            res.forEach((element) => {
              console.log(element);
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
const updateEmpRole = (empId, roleId) => {
  inquirer.prompt({
    type: "list",
    message: "Which employee needs a role change?",
    choices: [
      "John Doe",
      "Mike Chan",
      "Ashely Rodriguez",
      "Kevin Tupik",
      "Malia Brown",
      "Sarah Lourd",
      "Tom Allen",
    ],
    name: "empList",
  });
  return new Promise((resolve, reject) => {
    query = connection.query(
      "UPDATE employee SET ? WHERE ?"[
        {
          id: empId,
          role_id: roleId,
        }
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
};

// Delete an employee
const deleteEmp = (empId) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM employee WHERE ?", [{ id: empId }], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ msg: "An employee has been deleted." });
      }
    });
  });
};

// Bonus points if you're able to:
// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department

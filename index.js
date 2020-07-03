// const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require("console.table");
const connection = require("./connection");
const { viewAllDept, viewAllRoles, viewAllEmps } = require("./view");

const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        // "Add a role",
        // "Add an employee",
        "Update an employee role",
        "Delete an employee",
        "Quit",
      ],
      name: "menuChoice",
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

// // View all departments
// const viewAllDept = () => {
//   return new Promise((resolve, reject) => {
//     connection.query("SELECT name FROM department", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// // View all roles
// const viewAllRoles = () => {
//   return new Promise((resolve, reject) => {
//     connection.query("SELECT title FROM emp_role", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// // View all employees
// const viewAllEmps = () => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "SELECT first_name, last_name FROM employee",
//       (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       }
//     );
//   });
// };

// Add a department
const addDept = (addDeptText) => {
  inquirer
    .prompt({
      type: "prompt",
      name: "addDeptText",
      message: "What is the name of the department you would like to add?",
    })
    .then(({ addDeptText }) => {
      console.log(addDeptText);
      return new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO department SET ?",
          [{ name: addDeptText }],
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve({ msg: "A department was successfully added." });
            }
          }
        );
      });
    });
};

// Update an employee role
const updateEmpRole = (empId, roleId) => {
  inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
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

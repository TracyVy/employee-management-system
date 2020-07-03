const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Set up connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

// Test connection
connection.connect((err) => {
  if (err) throw err;
  console.log("We are connected to:", connection.threadId);
  mainMenu();
});

const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        // "View all roles",
        // "View all employees",
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
  viewAllDept();
};

// View all departments
const viewAllDept = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM department", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Add a department
const addDept = (dept_userText) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO department SET ?",
      [{ name: dept_userText }],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ msg: "A department was successfully added." });
        }
      }
    );
  });
};

// Update an employee role
const updateEmpRole = (empObj) => {
  return new Promise((resolve, reject) => {
    query = connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          id: empObj.empId,
          last_name: empObj.empLastName,
          first_name: empObj.empFirstName,
          role_id: empObj.empRoleId,
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

// console.table([employees_db]);

// Bonus points if you're able to:
// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department

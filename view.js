const connection = require("./connection");

// View all departments
const viewAllDept = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT name FROM department", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// View all roles
const viewAllRoles = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT title FROM emp_role", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// View all employees
const viewAllEmps = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT first_name, last_name FROM employee",
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

module.exports = { viewAllDept, viewAllRoles, viewAllEmps };

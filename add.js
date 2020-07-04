const connection = require("./connection");
const inquirer = require("inquirer");

// Add a department
const addDept = () => {
  inquirer
    .prompt({
      type: "prompt",
      name: "addDeptText",
      message: "What is the name of the department you would like to add?",
    })
    .then(({ addDeptText }) => {
      return new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO department SET ?",
          [{ name: addDeptText }],
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
    });
};

// Add a role
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chosenDept",
        message:
          "Choose which department you would like to add the role in to.",
        choices: [
          "Banking and Financial Services",
          "Technology",
          "Corporate",
          "Legal",
        ],
      },
      {
        type: "prompt",
        name: "addRoleText",
        message: "What is the name of the role you would like to add?",
      },
      {
        type: "prompt",
        name: "salary",
        message: "What is the base salary for this role?",
      },
    ])
    .then(({ chosenDept, addRoleText, salary }) => {
      if (chosenDept == "Banking and Financial Services") {
        department_id = "1";
      } else if (chosenDept == "Technology") {
        department_id = "2";
      } else if (chosenDept == "Corporate") {
        department_id = "3";
      } else if (chosenDept == "Legal") {
        department_id = "4";
      }
      return new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO emp_role SET ?",
          [
            {
              title: addRoleText,
              department_id: department_id,
              salary: salary,
            },
          ],
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
    });
};

// Add an employee
const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chosenMgr",
        message:
          "Will this employee have a manager? If so, who is the manager?",
        choices: [
          "This employee will NOT have a direct manager.",
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen",
        ],
      },
      {
        type: "prompt",
        name: "firstName",
        message: "What is the first name of the new employee?",
      },
      {
        type: "prompt",
        name: "lastName",
        message: "What is the last name of the new employee?",
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
    .then(({ chosenMgr, firstName, lastName, chosenRole }) => {
      let manager_id = null;
      console.log("XXX - chosenMgr=" + chosenMgr);
      if (chosenMgr == "This employee will NOT have a direct manager.") {
        manager_id = null;
      } else if (chosenMgr == "John Doe") {
        manager_id = "1";
      } else if (chosenMgr == "Mike Chan") {
        manager_id = "2";
      } else if (chosenMgr == "Ashley Rodriguez") {
        manager_id = "3";
      } else if (chosenMgr == "Kevin Tupik") {
        manager_id = "4";
      } else if (chosenMgr == "Malia Brown") {
        manager_id = "6";
      } else if (chosenMgr == "Sarah Lourd") {
        manager_id = "7";
      } else if (chosenMgr == "Tom Allen") {
        manager_id = "8";
      }
      console.log("XXX - manager_id=" + manager_id);
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
      console.log("XXX - role_id=" + role_id);
      return new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${role_id}, ${manager_id})`,
          [
            {
              first_name: firstName,
              last_name: lastName,
              role_id: role_id,
              manager_id: manager_id,
            },
          ],
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
    });
};

module.exports = { addDept, addRole, addEmp };

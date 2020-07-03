const connection = require("./connection");
const inquirer = require("inquirer");

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

module.exports = { addDept };

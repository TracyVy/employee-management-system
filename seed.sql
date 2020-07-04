DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

-- Make sure to select database first.
USE employees_db;

-- Create 3 tables: department, emp_role, employee
CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE emp_role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9,2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

-- View all from 3 tables. Each line views only content for its table.
SELECT * FROM department;
SELECT * FROM emp_role;
SELECT * FROM employee;

-- Update example
UPDATE employee SET role_id = '?' WHERE first_name = '?'
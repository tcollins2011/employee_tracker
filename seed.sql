DROP DATABASE IF EXISTS employeetrackerDB;

CREATE DATABASE employeetrackerDB;

USE employeetrackerDB;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL (8,2),
    department_id INT
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

INSERT INTO department (name)
VALUES('Accounting'),('HR'),('Fire Eaters'),('Mongoose Taming');

INSERT INTO role(title,salary,department_id)
VALUES("Money Launderer",50000.88,1),("investigative accountant", 70000,1),("Fight Manager",80000,2),("Duelist",1200.98,2);

INSERT INTO role(title,salary,department_id)
VALUES('Fire twirler',20000,3), ("Fire Starter", 3000.55,3), ("Mongoose Catcher", 100000.5,4), ("Mongoose Showman", 60000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES('Spencer','Slama',4,null),('Bronwyn',"Collins",7,null),('Kelsey',"Schwarma",8,2),('Marcia','Newkirk',1,null);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
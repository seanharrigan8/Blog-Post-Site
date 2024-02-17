DROP DATABASE IF EXISTS blog_db;
CREATE DATABASE blog_db;

USE blog_db;

// Create the tables
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(60) NOT NULL,
  password VARCHAR(60) NOT NULL,
  PRIMARY KEY (id)
);
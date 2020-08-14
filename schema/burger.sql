DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burger (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(35),
    eaten BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);

SELECT * FROM burger


CREATE TABLE bun (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    Calories INT,
    Carbs INT,
    Protien INT,
    Fats Int,
    PRIMARY KEY (id)
);

CREATE TABLE meat LIKE bun;
CREATE TABLE cheese LIKE bun;
CREATE TABLE condiment LIKE bun;
CREATE TABLE vegetable LIKE bun;

SELECT * FROM vegetable

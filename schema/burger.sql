DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burger (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(35),
    bun VARCHAR(35),
    ing1 VARCHAR(35),
    ing2 VARCHAR(35),
    ing3 VARCHAR(35),
    ing4 VARCHAR(35),
    ing5 VARCHAR(35),
    ing6 VARCHAR(35),
    ing7 VARCHAR(35),
    ing8 VARCHAR(35),
    ing9 VARCHAR(35),
    PRIMARY KEY (id)
);

CREATE TABLE bun (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(35),
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

SELECT * FROM burger
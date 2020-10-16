DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burger (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(35),
    ingArr INT,
    PRIMARY KEY (id)
);

CREATE TABLE ingredients (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(35),
    type VARCHAR(35),
    Calories INT,
    Carbs INT,
    Protein INT,
    Fats Int,
    PRIMARY KEY (id)
);

SELECT * FROM burger
SELECT * FROM ingredients
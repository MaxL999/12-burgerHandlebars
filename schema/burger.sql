DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burger (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(35),
    ingArr JSON,
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

CREATE TABLE burger_ingredients (
    burger_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (burger_id, ingredient_id)
);
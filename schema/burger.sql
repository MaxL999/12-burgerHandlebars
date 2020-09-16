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
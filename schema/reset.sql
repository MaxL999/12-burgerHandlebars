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
    calories INT,
    carbs INT,
    protein INT,
    fats Int,
    PRIMARY KEY (id)
);

CREATE TABLE burger_ingredients (
    burger_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (burger_id, ingredient_id)
);

INSERT INTO burger (name, ingArr)
VALUES ("Big Kahuna", JSON_ARRAY(1, 10, 9, 8, 5, 2, 5, 2));

INSERT INTO burger (name, ingArr)
VALUES("Plain Burger", JSON_ARRAY(4, 11, 3, 2));

INSERT INTO burger (name, ingArr)
VALUES("Double Cheeseburger", JSON_ARRAY(1, 11, 3, 2, 3, 2));


INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(1, 1);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(1, 2);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(1, 5);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(1, 8);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(1, 9);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(1, 10);


INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(2, 2);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(2, 3);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(2, 4);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(2, 11);


INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(3, 1);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(3, 2);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(3, 3);

INSERT INTO burger_ingredients (burger_id, ingredient_id)
VALUES(3, 11);


INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("Sesame", "Bun", 190, 34, 5, 3);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("Beef", "Meat", 300, 0, 29, 20);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("Cheddar", "Cheese", 100, 0, 7, 10);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("Whole Wheat", "Bun", 80, 20, 4, 0);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("American", "Cheese", 100, 1, 9, 10);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("Bison", "Meat", 150, 0, 9, 14);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("Onion", "Vegetable", 35, 8, 1, 0);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("Tomatoes", "Vegetable", 18, 4, 1 ,1);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("Lettuce", "Vegetable", 15, 2, 1, 1);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("BBQ", "Condiment", 29, 7, 0, 0);

INSERT INTO ingredients (name, type, calories, carbs, protein, fats)
VALUES ("Ketchup", "Condiment", 15, 5, 0, 0);
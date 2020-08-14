use burger_db;

insert into bun (name, Calories, Carbs, Protien, Fats)
VALUES ("Sesame", 190, 34, 5, 3);

insert into bun (name, Calories, Carbs, Protien, Fats)
VALUES ("Whole Wheat", 80, 20, 4, 0);


insert into meat (name, Calories, Carbs, Protien, Fats)
VALUES ("Beef", 300, 0, 29, 20);

insert into meat (name, Calories, Carbs, Protien, Fats)
VALUES ("Bison", 150, 0, 9, 14);


insert into vegetable (name, Calories, Carbs, Protien, Fats)
VALUES ("Onion", 35, 8, 1, 0);

insert into vegetable (name, Calories, Carbs, Protien, Fats)
VALUES ("Tomatoes", 18, 4, 1 ,1);

insert into vegetable (name, Calories, Carbs, Protien, Fats)
VALUES ("Lettuce", 15, 2, 1, 1);


insert into condiment (name, Calories, Carbs, Protien, Fats)
VALUES ("BBQ", 29, 7, 0, 0);

insert into condiment (name, Calories, Carbs, Protien, Fats)
VALUES ("Ketchup", 15, 5, 0, 0);


SELECT * FROM bun;
SELECT * FROM meat;
SELECT * FROM vegetable;
SELECT * FROM condiment;

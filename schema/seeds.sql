use burger_db;

insert into burger (name, bun, ing1, ing2, ing3, ing4, ing5, ing6, ing7)
VALUES ("Big Kahuna", "Sesame", "BBQ", "Lettuce", "Tomato", "American", "Beef", "American", "Beef");

insert into burger (name, bun, ing1, ing2, ing3)
VALUES("Plain Burger", "Whole Wheat", "Ketchup", "Cheddar", "Beef");

insert into burger (name, bun, ing1, ing2, ing3, ing4, ing5)
VALUES("Double Cheeseburger", "Sesame", "Ketchup", "Cheddar", "Beef", "Cheddar", "Beef");

insert into bun (name, Calories, Carbs, Protien, Fats)
VALUES ("Sesame", 190, 34, 5, 3);

insert into bun (name, Calories, Carbs, Protien, Fats)
VALUES ("Whole Wheat", 80, 20, 4, 0);


insert into meat (name, Calories, Carbs, Protien, Fats)
VALUES ("Beef", 300, 0, 29, 20);

insert into meat (name, Calories, Carbs, Protien, Fats)
VALUES ("Bison", 150, 0, 9, 14);


insert into cheese (name, Calories, Carbs, Protien, Fats)
VALUES ("Cheddar", 100, 0, 7, 10);

insert into cheese (name, Calories, Carbs, Protien, Fats)
VALUES ("American", 100, 1, 9, 10);


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
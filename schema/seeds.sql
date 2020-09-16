use burger_db;


insert into burger (name, bun, ing1, ing2, ing3, ing4, ing5, ing6, ing7)
VALUES ("Big Kahuna", "Sesame", "BBQ", "Lettuce", "Tomato", "American", "Beef", "American", "Beef");

insert into burger (name, bun, ing1, ing2, ing3)
VALUES("Plain Burger", "Whole Wheat", "Ketchup", "Cheddar", "Beef");

insert into burger (name, bun, ing1, ing2, ing3, ing4, ing5)
VALUES("Double Cheeseburger", "Sesame", "Ketchup", "Cheddar", "Beef", "Cheddar", "Beef");


insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("Sesame", "Bun", 190, 34, 5, 3);

insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("Whole Wheat", "Bun", 80, 20, 4, 0);


insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("Beef", "Meat", 300, 0, 29, 20);

insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("Bison", "Meat", 150, 0, 9, 14);


insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("Cheddar", "Cheese", 100, 0, 7, 10);

insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("American", "Cheese", 100, 1, 9, 10);


insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("Onion", "Vegetable", 35, 8, 1, 0);

insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("Tomatoes", "Vegetable", 18, 4, 1 ,1);

insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("Lettuce", "Vegetable", 15, 2, 1, 1);


insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("BBQ", "Condiment", 29, 7, 0, 0);

insert into ingredients (name, type, Calories, Carbs, Protein, Fats)
VALUES ("Ketchup", "Condiment", 15, 5, 0, 0);
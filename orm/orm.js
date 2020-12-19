// Import MySQL connection.
var connection = require('../config/connection.js');

// used to reset MYSQL database
// var fs = require('fs');
// var sqlSeeds = fs.readFileSync("./schema/reset.sql").toString();

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];

        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            // cut out of the if statement to make it work 
            // || value.indexOf(" ") >= 0
            if (typeof value === "string") {
                value = "'" + value + "'";
            }
            // key = "'" + key + "'"

            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// currently used in updateburger gives burger id and ingredient id array
// and returns a "(burgID, ingID[1]),(burgID, ingID[2]),(burgID, ingID[3])" string val
// sometimes the string needs a () to wrap everything, this is in the needed functions not the helper
function arrToSql(id, arr) {
    var stringVal = [];

    for (var i in arr) {
        stringVal.push("(" + id, arr[i] + ")")
        if (i === arr.length) stringVal.push(",")
    }

    stringVal.toString()
    return stringVal
}

// simple sort function
function sortArray(array, pattern) {
    var newArray = []
    for (i in pattern) {
        for (var t = 0; t < array.length; t++) {
            if (pattern[i] === array[t].id) newArray.push(array[t]);
        }
    }
    return newArray
}


// Object for all SQL statement functions.
const orm = {
    selectBurger: (id) => {
        return new Promise((resolve, reject) => {
            var queryString = "SELECT * FROM burgers";
            if (id) queryString += " WHERE id = " + id;
            connection.query(queryString, (err, result) => {
                if (err) return reject(err);
                resolve(result)
            });
        })
    },
    selectIng: (id) => {
        return new Promise((resolve, reject) => {
            var queryString = "SELECT * FROM ingredients";
            if (id) queryString += " WHERE id = " + id;
            connection.query(queryString, (err, result) => {
                if (err) return reject(err);
                resolve(result)
            });
        })
    },
    selectBurgerIng: (id) => {
        return new Promise((resolve, reject) => {
            var queryString = "SELECT * FROM burger_ingredients";
            if (id) queryString += " WHERE burger_id = " + id;
            connection.query(queryString, (err, result) => {
                if (err) return reject(err);
                resolve(result)
            });
        })
    },
    deleteIngredient: (id) => {
        return new Promise((resolve, reject) => {

            var queryString = "DELETE FROM ingredients WHERE id = " + id

            connection.query(queryString, (err) => {
                if (err) return reject(err);
                resolve()
            });
        })
    },
    deleteBurger: (id) => {
        return new Promise((resolve, reject) => {

            var queryString = "DELETE burgers, burger_ingredients FROM burgers"
            queryString += " INNER JOIN burger_ingredients ON burgers.id = burger_ingredients.burger_id"
            queryString += " WHERE burgers.id = " + id

            connection.query(queryString, (err) => {
                if (err) return reject(err);
                resolve()
            });
        })
    },
    updateIng: (data) => {
        return new Promise((resolve, reject) => {

            var queryString = "UPDATE ingredients SET "
            var values = {
                name: data.name,
                type: data.type,
                calories: data.calories,
                fats: data.fats,
                protein: data.protein,
                carbs: data.carbs
            }
            queryString += objToSql(values)
            queryString += " WHERE id = " + data.id

            connection.query(queryString, (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    },
    updateBurger: (data) => {
        return new Promise((resolve, reject) => {
            let updateBurger = "UPDATE burgers SET"
            updateBurger += " name = '" + data.name + "',"
            updateBurger += " ingArr = JSON_ARRAY(" + data.ingArr + ")"
            updateBurger += " WHERE id = " + data.id + ";"

            connection.query(updateBurger, (err, result) => {
                if (err) return reject(err)
                console.log(result)
                resolve()
            })
        })
    },
    createIng: (data) => {
        return new Promise((resolve, reject) => {

            var insertString = "INSERT INTO ingredients "
            insertString += " (name, type, Calories, Carbs, Protein, Fats) VALUES ('"
            insertString += data.name + "','" + data.type + "'," + data.calories + ","
            insertString += data.carbs + "," + data.protein + "," + data.fats + ");"

            connection.query(insertString, (err) => {
                if (err) reject(err)
                resolve()
            })
        })
    },
    createBurger: (data) => {
        return new Promise((resolve, reject) => {

            var insertString = "INSERT INTO burgers (name, ingArr) VALUES ('"
            insertString += data.name + "', JSON_ARRAY(" + data.burgerArr + "));"

            connection.query(insertString, (err, result) => {
                if (err) reject(err)
                resolve(result.insertId)
            })
        })
    },
    createBurgerIngredients: (burgerID, ingredientIdArr) => {
        return new Promise((resolve, reject) => {

            let insertString = "INSERT INTO burger_ingredients (burger_id, ingredient_id) "
            insertString += "VALUES " + arrToSql(burgerID, [...new Set(ingredientIdArr)]) + ";"

            connection.query(insertString, (err) => {
                if (err) reject(err)
                resolve()
            })
        })
    },
    deleteBurgerIngredients: (burgerID, ingredientIdArr) => {
        return new Promise((resolve, reject) => {

            let deleteString = "DELETE FROM burger_ingredients WHERE (burger_id, ingredient_id) IN ("
            deleteString += arrToSql(burgerID, ingredientIdArr) + ");"

            connection.query(deleteString, (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }
    // old/unused

    // resets the database
    // tables need to be reset aswell or else the seeds id's dont align withh eachother
    // restore: () => {
    //     return new Promise((resolve, reject) => {

    //         var deleteString = "DELETE burger, ingredients, burger_ingredients "
    //         deleteString += "FROM burger INNER JOIN ingredients INNER JOIN burger_ingredients "

    //         connection.query(deleteString, (err) => {
    //             if (err) return reject(err)

    //             connection.query(sqlSeeds, async (err) => {
    //                 // if (err) return reject(err)
    //                 if (err) return console.log(err);

    //                 var burger = await orm.all("burger")
    //                 var ingredient = await orm.all("ingredients")

    //                 resolve([burger, ingredient])
    //             })
    //         })
    //     })
    // },
};

module.exports = orm;
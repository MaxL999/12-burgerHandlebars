// Import MySQL connection.
var connection = require('../config/connection.js');

// used to reset MYSQL database
var fs = require('fs');
var sqlSeeds = fs.readFileSync("./schema/burger.sql").toString();

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

function dataToNull(data) {
    if (data !== null) {
        var word = ", '" + data + "'"
        return word
    } else {
        var word = ", NULL"
        return word
    }
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

// compares 2 arrays and find what is missing from second array
function arrayDifference(arrOne, arrTwo) {
    let returnVal = [];
    for (i in arrOne) {
        if (!arrTwo.includes(arrOne[i])) returnVal.push(arrOne[i])
    }
    return returnVal;
}


// Object for all SQL statement functions.
const orm = {
    all: (tableInput) => {
        return new Promise((resolve, reject) => {

            var queryString = "SELECT * FROM " + tableInput + ";";
            connection.query(queryString, (err, result) => {
                if (err) return reject(err);

                resolve(result)
            });
        })
    },
    // resets the database
    // tables need to be reset aswell or else the seeds id's dont align withh eachother
    restore: () => {
        return new Promise((resolve, reject) => {

            var deleteString = "DELETE burger, ingredients, burger_ingredients "
            deleteString += "FROM burger INNER JOIN ingredients INNER JOIN burger_ingredients "

            connection.query(deleteString, (err) => {
                if (err) return reject(err)

                connection.query(sqlSeeds, async (err) => {
                    if (err) return reject(err)

                    var burgerData = await orm.all("burger")
                    var ingData = await orm.all("ingredients")
                    resolve([burgerData, ingData])
                })
            })
        })
    },
    delete: (table, id) => {
        return new Promise((resolve, reject) => {

            var queryString = "DELETE " + table + ", burger_ingredients FROM " + table
            if (table === "burger") {
                queryString += " INNER JOIN burger_ingredients ON burger.id = burger_ingredients.burger_id"
            } else {
                queryString += " INNER JOIN burger_ingredients ON ingredients.id = burger_ingredients.ingredient_id"
            }
            queryString += " WHERE " + table + ".id = " + id

            connection.query(queryString, (err) => {
                if (err) return reject(err);
                // if (err) return console.log(err);
                resolve(orm.all(table))
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
                // if (err) return console.log(err);
                if (err) return reject(err)

                resolve(orm.all("ingredients"))
            })
        })
    },
    updateBurger: (data) => {
        return new Promise((resolve, reject) => {
            // update burger table
            let updateBurger = "UPDATE burger SET"
            updateBurger += " name = '" + data.name + "',"
            updateBurger += " ingArr = JSON_ARRAY(" + data.ingArr + ")"
            updateBurger += " WHERE id = " + data.id + ";"

            connection.query(updateBurger, (err) => {
                // if (err) return console.log(err);
                if (err) return reject(err)
            })

            // update burger_ingredients relation table
            // find current database values
            let searchSQL = "SELECT * FROM burger_ingredients WHERE burger_id = " + data.id + ";"

            connection.query(searchSQL, (err, result) => {
                if (err) return reject(err)
                // if (err) return console.log(err);

                // organize values
                let newData = [...new Set(data.ingArr)];
                let oldData = [];
                for (i in result) {
                    oldData.push(result[i].ingredient_id)
                }

                // compare to find desired values
                // values missing from newData needed for deletion
                let deleteVal = arrayDifference(oldData, newData)
                // values missing from oldData needed for insertion
                let insertVal = arrayDifference(newData, oldData)

                // delete undesired if necessary
                if (deleteVal.length) {
                    let deleteString = "DELETE FROM burger_ingredients WHERE (burger_id, ingredient_id) IN ("
                    deleteString += arrToSql(data.id, deleteVal) + ");"

                    connection.query(deleteString, (err) => {
                        if (err) return reject(err)
                        // if (err) console.log(err)
                    })
                }

                // insert desired if necessary
                if (insertVal.length) {
                    let insertString = "INSERT INTO burger_ingredients (burger_id, ingredient_id) "
                    insertString += "VALUES " + arrToSql(data.id, insertVal) + ";"

                    connection.query(insertString, (err) => {
                        if (err) return reject(err)
                        // if (err) console.log(err)
                    })
                }

                resolve(orm.all("burger"))
            })
        })
    },
    create: (data) => {
        return new Promise((resolve, reject) => {

            var queryString = "INSERT INTO " + data.table + " "
            if (data.table === "burger") {
                queryString += " (name, ingArr) VALUES ('" + data.name + "', JSON_ARRAY(" + data.burgerArr + "));"

                // need to create second query for the relation table 
            } else {
                queryString += " (name, type, Calories, Carbs, Protein, Fats) VALUES ('"
                queryString += data.name + "','" + data.type + "'," + data.calories + ","
                queryString += data.carbs + "," + data.protein + "," + data.fats + ");"
            }

            connection.query(queryString, (err, result) => {
                if (err) reject(err)
                // if (err) console.log(err)

                var returnData = orm.all(data.table)
                resolve(returnData)
            })
        })
    },
    join: (id) => {
        return new Promise((resolve, reject) => {
            var burgerString = "SELECT * FROM burger "
            burgerString += "WHERE burger.id = " + id + " "

            connection.query(burgerString, (err, burger) => {
                if (err) throw console.log(err)
                // if (err) throw reject(err)

                var ingredientArr = JSON.parse(burger[0].ingArr);
                ingredientArr.toString().replace(/[\[\]']+/g, '');

                var itemString = "SELECT * FROM ingredients WHERE id IN (" + ingredientArr + ")"

                connection.query(itemString, (err, ingredients) => {
                    // if (err) throw console.log(err)
                    if (err) throw reject(err)

                    var result = sortArray(ingredients, ingredientArr)
                    console.log(result)

                    resolve(result)
                })
            })

        })
    }
};

module.exports = orm;
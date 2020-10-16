// Import MySQL connection.
var connection = require("../config/connection.js");


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
            key = "'" + key + "'"

            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}


function arrToSql(arr) {
    var stringVal = [];

    for (var key in arr) {
        var sqlVal = arr[key]

        if (typeof arr[key] === "string") sqlVal = "'" + sqlVal + "'";
        if (arr[key] === null) break;

        stringVal.push(sqlVal)
    }
    return stringVal.toString()
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

function sortArray(array, pattern) {
    var newArray = []

    for (var i = 0; i < pattern.length; i++) {
        for (var t = 0; t < array.length; t++) {
            if (pattern[i] === array[t].id) newArray.push(array[t]);
        }
    }

    return newArray
}


// Object for all our SQL statement functions.
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
    delete: (table, id) => {
        return new Promise((resolve, reject) => {
            var queryString = "DELETE FROM " + table + " WHERE ID = " + id
            connection.query(queryString, (err, result) => {
                if (err) return reject(err);
                resolve(result)
            });
        })
    },

    update: (data) => {
        return new Promise((resolve, reject) => {
            var queryString = "UPDATE " + data.table + " SET "
            if (data.table === "burger") {
                let values = {
                    name: data.Name,
                    bun: data.Bun,
                    ing1: ((data.Ing1) ? data.Ing1 : null),
                    ing2: ((data.Ing2) ? data.Ing2 : null),
                    ing3: ((data.Ing3) ? data.Ing3 : null),
                    ing4: ((data.Ing4) ? data.Ing4 : null),
                    ing5: ((data.Ing5) ? data.Ing5 : null),
                    ing6: ((data.Ing6) ? data.Ing6 : null),
                    ing7: ((data.Ing7) ? data.Ing7 : null),
                    ing8: ((data.Ing8) ? data.Ing8 : null),
                    ing9: ((data.Ing9) ? data.Ing9 : null),
                }
                queryString += objToSql(values)
            } else {
                let values = {
                    name: data.Name,
                    type: data.Type,
                    calories: data.Calories,
                    fats: data.Fats,
                    protein: data.Protein,
                    carbs: data.Carbs
                }
                queryString += objToSql(values)
            }
            queryString += " WHERE ID = " + data.id

            connection.query(queryString, (err, result) => {
                if (err) return reject(err);
                resolve(result)
            })
        })
    },
    create: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            var queryString = "INSERT INTO " + data.table
            if (data.table === "burger") {
                queryString += " (name, ingArr) VALUES ('" + data.Name + "', JSON_ARRAY(" + data.ingArr + "));"
            } else {
                queryString += " (name, type, Calories, Carbs, Protein, Fats) VALUES ('"
                queryString += data.Name + "','" + data.Type + "'," + data.Calories + ","
                queryString += data.Carbs + "," + data.Protein + "," + data.Fats + ")"
            }
            connection.query(queryString, (err, result) => {
                if (err) reject(err)
                // if (err) console.log(err)
                resolve(result)
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

                var ingredientArr = JSON.parse(burger[0].ingArr)

                var itemString = "SELECT * FROM ingredients WHERE id IN ("
                itemString += ingredientArr.toString().replace(/[\[\]']+/g, '') + ")"

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
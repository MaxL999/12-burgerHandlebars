// Import MySQL connection.
var connection = require('../config/connection.js');

var fs = require('fs');
// var burgerSeeds = require('../schema/seeds.sql')
// var sql = fs.readFileSync(burgerSeeds).toString();

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
    // in progress
    restore: () => {
        return new Promise((resolve, reject) => {
            var deleteString = "DELETE * FROM burger; "
            deleteString += "DELETE * FROM ingredients; "
            deleteString += "DELETE * FROM burger_ingredients; "
            connection.query(deleteString, (err, result) => {
                // if (err) return reject (err)
                if (err) console.log(err)
                console.log(result)
                resolve()
            })

        })
    },
    delete: (table, id) => {
        return new Promise((resolve, reject) => {
            var queryString = "DELETE FROM " + table + " WHERE ID = " + id
            connection.query(queryString, (err, result) => {
                if (err) return reject(err);
                var returnData = orm.all(table)
                resolve(returnData)
            });
        })
    },

    update: (data) => {
        return new Promise((resolve, reject) => {
            
            var queryString = "UPDATE " + data[0] + " SET "
            if (data[0] === "burger") {
                var values = {
                    name: data[1].name,
                    ingArr: data[1].ingArr,
                }
            } else {
                var values = {
                    name: data.name,
                    type: data.type,
                    calories: data.calories,
                    fats: data.fats,
                    protein: data.protein,
                    carbs: data.carbs
                }
            }
            queryString += objToSql(values)
            queryString += " WHERE id = " + data[1].id

            console.log(queryString)
            connection.query(queryString, (err, result) => {
                if (err) return console.log(err);
                var returnData = orm.all(data[0])
                resolve(returnData)
            })
        })
    },
    create: (data) => {
        return new Promise((resolve, reject) => {
            var queryString = "INSERT INTO " + data[0]
            if (data[0] === "burger") {
                queryString += " (name, ingArr) VALUES ('" + data[1].name + "', JSON_ARRAY(" + data[1].burgerArr + "));"
            } else {
                queryString += " (name, type, Calories, Carbs, Protein, Fats) VALUES ('"
                queryString += data[1].name + "','" + data[1].type + "'," + data[1].calories + ","
                queryString += data[1].carbs + "," + data[1].protein + "," + data[1].fats + ")"
            }
            connection.query(queryString, (err, result) => {
                if (err) reject(err)
                var returnData = orm.all(data[0])
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
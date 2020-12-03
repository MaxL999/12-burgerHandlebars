// Import MySQL connection.
var connection = require('../config/connection.js');

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
                var returnData = orm.all(table)
                resolve(returnData)
            });
        })
    },
    updateIng: (data) => {
        return new Promise((resolve, reject) => {

            var queryString = "UPDATE " + data.table + " SET "
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

                var returnData = orm.all(data.table)
                resolve(returnData)
            })
        })
    },
    updateBurger: (data) => {
        return new Promise((resolve, reject) => {

            // let updateBurgerTable = "UPDATE " + data.table + " SET "
            // let values = {
            //     name: data.name,
            //     ingArr: JSON.stringify(data.ingArr),
            // }
            // updateBurgerTable += objToSql(values)
            // updateBurgerTable += " WHERE id = " + data.id

            // connection.query(updateBurgerTable, (err) => { if (err) return reject(err) })

            // since the burger table has a array of ings for proper ing sorting,
            // logic is needed to properly edit the relation table 

            // console.log(data)

            // find current database values
            let searchSQL = "SELECT * FROM burger WHERE id = " + data.id + ";"

            connection.query(searchSQL, (err, result) => {
                // if (err) return reject(err)
                if (err) return console.log(err)

                // console.log(result)

                // organize values
                let uniqueIngs = [...new Set(JSON.parse(result[0].ingArr))];
                var oldArr = uniqueIngs.sort((a, b) => { return a - b })
                var newArr = data.ingArr.sort((a, b) => { return a - b })

                console.log(oldArr)
                console.log(newArr)

                // compare to desired values
                for (var i = 0; i < newArr.length; i++) {
                    console.log(oldArr.includes(newArr[i]))
                }

                // delete undesired

                // add desired new values

            })




            let returnData = orm.all(data.table)
            resolve(returnData)
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
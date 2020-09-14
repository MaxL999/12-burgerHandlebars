// // Make sure we wait to attach our handlers until the DOM is fully loaded.
// $(function () {
//     $(".change-eaten").on("click", function (event) {
//         var id = $(this).data("id");
//         var newEaten = $(this).data("lunch");
//         console.log("click")
//         var newLunch = {
//             eaten: newEaten
//         };

//         // Send the PUT request.
//         $.ajax("/api/food/" + id, {
//             type: "PUT",
//             data: newLunch
//         }).then(
//             function () {
//                 console.log("changed eaten state to", newLunch);
//                 // Reload the page to get the updated list
//                 location.reload();
//             }
//         );
//     });

//     $(".create-form").on("submit", function (event) {
//         // Make sure to preventDefault on a submit event.
//         event.preventDefault();
//         console.log("click")
//         var newburger = {
//             name: $("#burger-name").val().trim(),
//             eaten: 0
//         };

//         console.log(newburger)

//         // Send the POST request.
//         $.ajax("/api/food", {
//             type: "POST",
//             data: newburger
//         }).then(
//             function () {
//                 // Reload the page to get the updated list
//                 location.reload();
//             }
//         );
//     });

//     $(".delete-burger").on("click", function (event) {
//         var id = $(this).data("id");
//         console.log("click")
//         // Send the DELETE request.
//         $.ajax("/api/food/" + id, {
//             type: "DELETE"
//         }).then(
//             function () {
//                 console.log("deleted burger", id);
//                 // Reload the page to get the updated list
//                 location.reload();
//             }
//         );
//     });
// });


import axios from 'axios';

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

const API = {

    table: (tableName) => {
        return new Promise((resolve, reject) => {
            let axiosString = "http://localhost:3001/api/all/" + tableName
            axios.get(axiosString, config)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    delete: (table, id) => {
        return new Promise((resolve, reject) => {
            let axiosString = "http://localhost:3001/api/delete/" + table + "/" + id
            axios.get(axiosString, config)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },
    // eat: function (id) {


    //     // Send the PUT request.
    //     $.ajax("/api/food/" + id, {
    //         type: "PUT",
    //         data: newLunch
    //     }).then(
    //         function () {
    //             console.log("changed eaten state to", newLunch);
    //             // // Reload the page to get the updated list
    //             // location.reload();
    //         }
    //     );
    // }
}

export default API;
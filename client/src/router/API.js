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

// axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
//     .then(res => {
//         const posts = res.data.data.children.map(obj => obj.data);
//         this.setState({ posts });
//     });

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

const API = {
    // all: function () {
    //     console.log("frontend call")
    //     axios.get("/api/food/")
    //         .then(function (data) {
    //             console.log("frontend data recieved")
    //             console.log(data)
    //         })
    //         .catch(function (err) {
    //             console.log("error")
    //         })
    //     console.log("send")
    // },

    test: function () {
        console.log("click")

        axios.get("http://localhost:3001/api/hello", config)
            .then(function (data) {
                console.log(data)
            })
            .catch(function (err) {
                console.log(err)
            })

        console.log("send")
    }

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
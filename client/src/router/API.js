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
            axios.get(axiosString)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    delete: (table, id) => {
        return new Promise((resolve, reject) => {
            let axiosString = "http://localhost:3001/api/" + table + "/" + id
            axios.delete(axiosString)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    update: (values) => {
        return new Promise((resolve, reject) => {
            let axiosString = "http://localhost:3001/api/update"
            axios.post(axiosString, values)
                .catch((err) => reject(err))
                .then((data) => resolve(data))

        })
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
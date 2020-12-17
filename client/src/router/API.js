import axios from 'axios';

// might need to fix cross origin reference bug
// const config = {
//     headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//     }
// };

const API = {

    table: (tableName) => {
        return new Promise((resolve, reject) => {
            console.log("searching")
            let axiosString = "http://localhost:3001/api/all/" + tableName
            axios.get(axiosString)
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
                .then((data) => resolve(data))
        })
    },

    restoreSQL: () => {
        return new Promise((resolve, reject) => {
            let axiosString = "/api/restore/"
            axios.post(axiosString)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    delete: (table, id) => {
        return new Promise((resolve, reject) => {
            let axiosString = "/api/" + table + "/" + id
            axios.delete(axiosString)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    update: (data) => {
        return new Promise((resolve, reject) => {
            let axiosString = "/api/update"
            axios.post(axiosString, data)
                .catch((err) => reject(err))
                .then((data) => resolve(data))

        })
    },

    create: (data) => {
        return new Promise((resolve, reject) => {
            let axiosString = "/api/create"
            axios.post(axiosString, data)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    nutrition: (id) => {
        return new Promise((resolve, reject) => {
            let axiosString = "/api/nutrition/" + id
            axios.get(axiosString)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    }
}

export default API;
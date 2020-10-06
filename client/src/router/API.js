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
    },

    create: (values) => {
        return new Promise((resolve, reject) => {
            let axiosString = "http://localhost:3001/api/create"
            axios.post(axiosString, values)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    nutrition: (id) => {
        return new Promise((resolve, reject) => {
            let axiosString = "http://localhost:3001/api/nutrition/" + id  
            axios.get(axiosString)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    }
}

export default API;
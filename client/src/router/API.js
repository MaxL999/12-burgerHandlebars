import axios from 'axios';

// might need to fix cross origin reference bug
// const config = {
//     headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//     }
// };

const API = {

    // used to easily change link name for testing, 
    // needs real logic so it changes automatically
    hostName: () => {
        let host = true;
        if (host) {
            return "https://burger-break-down.herokuapp.com"
        } else {
            return "http://localhost:3001"
        }
    },

    search: () => {
        return new Promise((resolve, reject) => {
            let axiosString = API.hostName() + "/api/search"
            axios.get(axiosString)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    restoreSQL: () => {
        return new Promise((resolve, reject) => {
            let axiosString = API.hostName() + "/api/restore"
            axios.post(axiosString)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    delete: (table, id) => {
        return new Promise((resolve, reject) => {
            let axiosString = API.hostName() + "/api/" + table + "/" + id
            axios.delete(axiosString)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    update: (table, data) => {
        return new Promise((resolve, reject) => {
            let axiosString = API.hostName() + "/api/update/" + table
            axios.post(axiosString, data)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    create: (table, data) => {
        return new Promise((resolve, reject) => {
            let axiosString = API.hostName() + "/api/create/" + table
            axios.post(axiosString, data)
                .catch((err) => reject(err))
                .then((data) => resolve(data))
        })
    },

    // old/outdated
    // nutrition: (id) => {
    //     return new Promise((resolve, reject) => {
    //         let axiosString = "/api/nutrition/" + id
    //         axios.get(axiosString)
    //             .catch((err) => reject(err))
    //             .then((data) => resolve(data))
    //     })
    // }
}

export default API;
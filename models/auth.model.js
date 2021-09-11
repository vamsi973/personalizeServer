var db = require('mongodb');
const ObjectId = db.ObjectID;

const authmodel = {

    userAvailable: async (conn, username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('users').findOne({ email: username });
                resolve(result);
            } catch (error) {
                console.log(error)
                reject(error)
            }
        });
    },

    register: (conn, data) => {
        return new Promise(async (resolve, reject) => {

            try {
                const result = await conn.collection('users').insertOne(data);
                resolve(result);
            } catch (error) {
                console.log(error)
                reject(error)
            }
        });
    },
    userData: (conn, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data,1452)
                const result = await conn.collection('users').findOne(data);
                console.log(result,1452);
                resolve(result);
            } catch (error) {
                console.log(error)
                reject(error)
            }
        });
    },

}

module.exports = authmodel
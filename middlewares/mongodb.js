const MongoClient = require('mongodb').MongoClient;
const config = require('../utilities/config');
var Db = require('mongodb').Db;
Server = require('mongodb').Server;
module.exports = async function () {
    return new Promise(async (resolve, reject) => {
        let database = await connect()
        resolve(database);
    })
}

connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(config.db_url, { useNewUrlParser: true, useUnifiedTopology: true }, {
            // useNewUrlParser: true,
        }, async (err, client) => {
            if (err) {
                console.log("error from connection", err);
                process.exit(1);
                resolve(false)
            } else {
                mongoConnection = client.db('personal');
                resolve(mongoConnection)
            }
        })
    })
}


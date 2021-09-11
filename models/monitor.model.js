const monitorModel = {

    userCount: async (conn, id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('users').aggregate(
                    [
                        {
                            $group: {
                                _id: "$active",
                                "count": {
                                    $sum: 1
                                }
                            }
                        },
                    ]).toArray();
                resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    },

    test: async (conn, id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('users').find({}).toArray();
                resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    },

    insertError: async (conn, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await conn.collection('logger').insertOne(data);
                resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    }
}

module.exports = { monitorModel }
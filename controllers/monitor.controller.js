
const { monitorModel } = require('../models/monitor.model');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;

const monitorController = {

    userCount: async (req, res) => {
        try {
            let result = await monitorModel.userCount(req.mongoConnection);
            let temp = {};
            for (a of result) {
                if (a._id == false) {
                    temp['inactive_account'] = a.count;
                } else if (a._id == true) {
                    temp['active_account'] = a.count;
                } else {
                    temp['others'] = a.count;
                }
            }
            res.send({ success: true, data: temp });

        } catch (error) {
            console.log(error);
            res.send({ success: false, data: error });
        }
    },
    test: async (req, res) => {
        
        try {
            let result = await monitorModel.test(req.mongoConnection);
            res.send({ success: true, data: result });

        } catch (error) {
            console.log(error);
            res.send({ success: false, data: error });
        }
    },

    createLogger :async (req, res) => {
        
        try {
            let result = await monitorModel.test(req.mongoConnection,req.body);
            res.send({ success: true, data: result });

        } catch (error) {
            console.log(error);
            res.send({ success: false, data: error });
        }
    },
    

}


module.exports = { monitorController }
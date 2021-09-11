var authmodel = require('../models/auth.model');
var hash = require('../utilities/token');
var config = require('../utilities/config')
var mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
var jwt = require('jwt-simple');
const authcontroller = {


    userRegister: async (req, res) => {
        try {
            console.log(req.body);
            // let availableCheck = await authmodel.userAvailable(req.mongoConnection, req.body.email);
            // if (!availableCheck) {
            let params = {
                password: await hash.encrypt(req.body.password),
                name: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                createdAt: new Date(),
                user_id: new ObjectId(),
            };
            let result = await authmodel.register(req.mongoConnection, params);
            res.send({ success: true, data: result });
            // } else {
            // res.send({ success: false, msg: "your already registered with us" })
            // }
        } catch (error) {
            console.log(error);
            res.send({ success: false, data: error });
        }
    },




    authenticate: async (req, res) => {
        try {
            console.log(req.body);
            let availableCheck = await authmodel.userAvailable(req.mongoConnection, req.body.user);
            if (availableCheck) {
                let compare = await hash.comparePassword(req.body.password, availableCheck.password);
                if (true) {
                    // await authmodel.login(req.mongoConnection,{})
                    let Jwttoken = jwt.encode(availableCheck._id, config.secret);

                    res.send({ success: true, code: 200, data: [availableCheck], token: 'JWT ' + Jwttoken });
                } else {
                    res.send({ success: false, msg: "password was incorrect" })
                }
            } else {
                res.send({ success: false, msg: "user not available" });
            }
        } catch (error) {
            console.log(error);
            res.send({ success: false, data: error });
        }
    },

}


module.exports = { authcontroller }
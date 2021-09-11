var express = require('express');
var app = express();
const dbMiddleWare = require('./middlewares/mongodb');
var bodyParser = require('body-parser');
var cors = require('cors');
var requestLog = require('url-request-log');
var { tokenValidator } = require('./middlewares/tokenValidator')
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
var excel = require("exceljs");
var workbook1 = new excel.Workbook();
workbook1.creator = 'Me';
workbook1.lastModifiedBy = 'Me';
workbook1.created = new Date();
workbook1.modified = new Date();
var sheet1 = workbook1.addWorksheet('Sheet1');
var reHeader = ['name', 'active'];
var reColumns = [
    { header: 'name', key: 'firstname' },
    { header: 'active', key: 'lastname' },

];
sheet1.columns = reColumns;
sheet1.columns = ["av", "bv"]

app.use(cors());

app.use(requestLog.log());
// mongo connection creation
let db;
dbMiddleWare().then(database => {
    db = database;
}).catch(err => {
    // console.log(err, 20)
})
app.use((req, res, next) => {
    // Adding the connection to the request object
    if (!db) {
        // console.log('im in middleware!')
        dbMiddleWare().then(database => {
            db = database;
            req.mongoConnection = db;
            next();
        }).catch(err => {
            res.send({ success: false, error: 'Mongo Error!' })
            return;
        })
    }
    req.mongoConnection = db;
    next();
});



// Routes
const monitor = require('./routes/monitor');
const auth = require('./routes/auth');
const notes = require('./routes/notes');
const budget = require('./routes/budget');



var apiRoutes = express.Router();

app.use('/api', apiRoutes);



//routes  start
apiRoutes.use('/monitor', monitor)
apiRoutes.use('/auth', auth)
apiRoutes.use('/notes', tokenValidator.decodeToken, notes)
apiRoutes.use('/budget', tokenValidator.decodeToken, budget)



var port = process.env.PORT || 9000;
var server = app.listen(port, () => {
    workbook1.xlsx.writeFile("./uploads/error.xlsx").then(function () {
        console.log("xlsx file is written.");
    });
    console.log(`Server is listening on ${server.address().address}:${server.address().port}`);
});



//fixed user role

// app.use((req, res, next) => {
//     console.log("hai request1")
//     // console.log(req);
//     // Adding the connection to the request object
    //     MongoClient.connect(req.body.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    //         req.mongoConnection = client;
    //         next()
    //     });
// });
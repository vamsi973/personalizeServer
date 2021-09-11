var router = require('express').Router();
const { monitorController } = require('../controllers/monitor.controller');

router.get('/usersCount', monitorController.userCount);
router.get('/test', monitorController.test);
router.get('/create', monitorController.createLogger);


module.exports = router;
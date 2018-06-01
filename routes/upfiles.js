const upfileCtrl = require('../controllers/upfile');
const router = require('koa-router')();

router
    .prefix('/upfile')
    .get('/', upfileCtrl.indexAction)
    .post('/save', upfileCtrl.saveAction);

module.exports = router;

const ipCtrl = require('../controllers/ipController');
const router = require('koa-router')();

router
    .prefix('/ip')
    .get('/', ipCtrl.list);

module.exports = router;

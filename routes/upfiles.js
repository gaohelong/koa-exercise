const upfileCtrl = require('../controllers/upfileController');
const router = require('koa-router')();

router
    .prefix('/upfile')
    .get('/', upfileCtrl.indexAction)
    .post('/save', upfileCtrl.saveAction)
    .get('/multer', upfileCtrl.multerAction)
    .post('/multerSave', upfileCtrl.multerConfig().single('chinaAvatar'), upfileCtrl.multerSaveAction);

module.exports = router;

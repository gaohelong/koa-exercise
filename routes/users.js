let ipModule = require('../modules/ip');
const router = require('koa-router')();
router.prefix('/users');

router.get('/', async function (ctx, next) {
    let ipList;
    await ipModule.ipList().then(result => {
        ipList = result;
    });

    let str = '';
    ipList.forEach(function(v, k) {
        str += `\nid: ${v.id}`;
    });

    ctx.body = `this is a users response!${str}`;
});

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response';
});

module.exports = router;

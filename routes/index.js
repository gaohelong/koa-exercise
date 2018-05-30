const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    });
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    };
});

// 重定向到首页.
router.get('/redirect', async (ctx, next) => {
    ctx.redirect('/');
});

module.exports = router;

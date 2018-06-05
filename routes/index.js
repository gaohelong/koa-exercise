const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    console.log(ctx.token);
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    });
});

router.get('/string', async (ctx, next) => {
    console.log(ctx.socket);
    console.log(ctx.request);
    ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
    console.log(ctx.response);
    ctx.body = {
        title: 'koa2 json'
    };
});

// 重定向到首页.
router.get('/redirect', async (ctx, next) => {
    ctx.redirect('/');
});

module.exports = router;

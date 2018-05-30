const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    console.log(ctx.request.header);
    console.log(ctx.request.href);
    console.log(ctx.request.origin);
    ctx.body = 'China';
});

app.listen(3007);

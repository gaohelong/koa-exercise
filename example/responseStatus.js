const Koa = require('koa');
const app = new Koa();

// 相当于 ctx.throw(404, 'page not found!);
app.use((ctx, next) => {
    ctx.status = 404;
    ctx.body = 'page not found!';
});

app.listen(3000);

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.throw(400, 'name required');
    ctx.body = 'Hello World';
});

app.listen(3005);

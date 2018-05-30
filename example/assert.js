const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    // ctx.state.user = 'china';
    ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
    // ctx.throw(400, 'name required');
    ctx.body = 'Hello World';
});

app.listen(3006);

const Koa = require('koa');
const app = new Koa();
console.log(app);

let msg = '';
app.use(async (ctx, next) => {
    msg += "第一步:\r";
    await next();
    console.log('下周没有中间件需要执行，第一步打log!');
});

app.use(async (ctx, next) => {
    msg += "第二步:\r";
    await next();
    console.log('下游没有中间件需要执行，第二步打log!');
});

app.use(async (ctx, next) => {
    ctx.body = msg;
});

app.listen(3000);

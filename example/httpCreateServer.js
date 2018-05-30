const http = require('http');
const Koa = require('koa');
const app = new Koa();

// exec step 1.
app.use(async (ctx, next) => {
    console.log("------1------");
    await next();
    ctx.body += 'createServer OK';
});

// exec step 2.
app.use(async (ctx, next) => {
    console.log("------2------\n\n\n");
    ctx.body = 'step 1 ';
});

// app.listen(...) 方法只是以下方法的语法糖:
http.createServer(app.callback()).listen(3002);

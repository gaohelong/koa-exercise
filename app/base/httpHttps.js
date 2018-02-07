const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();

// exec step 1.
app.use(async (ctx, next) => {
    await next();
    ctx.body += 'step 2';
});

// exec step 2.
app.use(async (ctx, next) => {
    ctx.body = 'step 1 ';
});

http.createServer(app.callback()).listen(3003);
http.createServer(app.callback()).listen(3004);
// https.createServer(app.callback()).listen(3005);

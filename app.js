const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');
const upfiles = require('./routes/upfiles');
const ip = require('./routes/ip');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(`${__dirname}/public`));
app.use(views(`${__dirname}/views`, {
    extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(upfiles.routes(), upfiles.allowedMethods());
app.use(ip.routes(), ip.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

// 可以通过编辑 app.context 为 ctx 添加其他属性。这对于将 ctx 添加到整个应用程序中使用的属性或方法非常有用，
// 这可能会更加有效（不需要中间件）和/或 更简单（更少的 require()），而更多地依赖于ctx。
app.context.token = 'china2018';

// mysql.
// app.context.mysqlQuery = require('./lib/mysql');

module.exports = app;

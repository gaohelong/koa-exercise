const Koa = require('koa');
const app = new Koa();

// x-response-time.
app.use(async (ctx, next) => {
    console.log('------1------'); // step1
    const start = Date.now();
    console.log('------2------'); // step2
    await next();
    console.log('------3------'); // step11
    const ms = Date.now() - start;
    console.log('------4------'); // step 12
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log("------5------\n\n"); // step 13
});

// logger.
app.use(async (ctx, next) => {
    console.log('------6------'); // step3
    const start = Date.now();
    console.log('------7------'); // step4
    await next();
    console.log('------8------'); // step7
    const ms = Date.now() - start;
    console.log('------9------'); // step8
    console.log(`log: ${ctx.method} ${ctx.url} - ${ms}`); // step9
    console.log('------10------'); // step10
});

// response.
app.use(async ctx => {
    console.log('------11------'); // step5
    ctx.body = 'Hi World';
    console.log('------12------'); // step6
});

app.listen(3001);

const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

/**
 * 打开另一个命令行窗口，运行下面的命令。
 * $curl -X POST --data "name=Jack" 127.0.0.1:3000
 * 结果: {"name":"Jack"}
 *
 * $ curl -X POST --data "name" 127.0.0.1:3000
 * 结果: name required
 */
const main = async function(ctx) {
    console.log(ctx.request);
    const body = ctx.request.body;
    console.log(body);
    if (!body.name) ctx.throw(400, '.name required');
    ctx.body = { name: body.name };
};

app.use(koaBody());
app.use(main);
app.listen(3000);

const Koa = require('koa');
const app = new Koa();

const crypto = require('crypto');
const secret = '76a,.12';

const data = { name: 'cloud', age: 18 };
app.use(async ctx => {
    const hash = crypto.createHmac('sha256', secret)
        .update(JSON.stringify(data))
        .digest('hex');
        
    ctx.body = hash;
});

app.listen(3008);

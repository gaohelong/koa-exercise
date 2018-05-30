const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const app = new Koa();

/**
 * curl --form upload=@/home/root/sidenav4.jpg http://127.0.0.1:3000
 */
const main = async function(ctx) {
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || {};

    for (let key in files) {
        const file = files[key];
        const filePath = path.join(tmpdir, file.name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        filePaths.push(filePath);
    }

    ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
app.use(main);
app.listen(3000);

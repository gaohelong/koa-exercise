const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');

const formidable = require('formidable');
const upfile = (ctx, next) => {
    if (ctx.request.url == '/') {
        ctx.status = 200;
        ctx.type = 'html';
        ctx.body = `<form action="/upload" enctype="multipart/form-data" method="post">
                        <input type="text" name="title"><br>
                        <input type="file" name="upload" multiple="multiple"><br>
                        <input type="submit" value="Upload">
                    </form>`;
    } else if (ctx.request.url == '/upload') {
        var form = new formidable.IncomingForm(),
            files = [],
            fields = [];

        form.uploadDir = path.resolve(__dirname, '../upfiles');
        form.keepExtensions = true;
        form.parse(ctx.req, function(err, fields, files) {
            // 文件重命名.
            let oldName = files.upload.path;
            let newName = oldName.replace('upload_', '');
            fs.renameSync(oldName, newName);
        });

        form
            .on('field', function(field, value) {
                // console.log('field:', field, value);
                fields.push([field, value]);
            })
            .on('file', function(field, file) {
                // console.log('file:', field, file);
                files.push([field, file]);
            })
            .on('end', function() {
                console.log('-> upload done');
            });
    } else {
        ctx.response.writeHead(404, {'content-type': 'text/plain'});
        ctx.response.end('404');
    }
};

app.use(upfile);
app.listen(3000);

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const formidableUpload = (ctx) => {
    return new Promise((resolve, reject) => {
        let form = new formidable.IncomingForm();
        let files = [];
        let fields = [];

        form.uploadDir = path.resolve(__dirname, '../upfiles');
        form.keepExtensions = true;
        // form.maxFileSize = 1;
        form
            .on('error', function(err) {
                console.log(err);
                reject(err);
            })
            .on('field', function(field, value) {
                // console.log('---field:', field, value, '---');
                fields.push([field, value]);
            })
            .on('file', function(field, file) {
                // console.log('---file:', field, file, '---');
                files.push([field, file]);
            })
            .on('end', function() {
                console.log('-> upload done');
            });

        form.parse(ctx.req, function(err, fields, files) {
            // 文件重命名.
            let oldName = files.uploadName.path;
            let newName = oldName.replace('upload_', '');
            fs.renameSync(oldName, newName);

            let fileName = newName.substr(newName.indexOf('upfiles'));
            console.log(fileName);
            resolve(fileName);
        });       
    }); 
};

module.exports = formidableUpload;

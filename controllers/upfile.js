const cryptoTools = require('../tools/crypto');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

/**
 * 上传文件: 首页.
 */
exports.indexAction = async (ctx, next) => {
    let obj = { name: 'cloud', age: 18 };
    let str = '123456';
    await ctx.render('upfile', {
        title: 'upfile',
        objCrypto: `${JSON.stringify(obj)} - ${cryptoTools.hmacSha256(obj)}`,
        strMd5Crypto: `${str} - ${cryptoTools.hashMd5(str)}`
    });
};

/**
 * 上传文件: 保存.
 */
let fileName = '上传中';
exports.saveAction = async (ctx, next) => {
    let form = new formidable.IncomingForm();
    let files = [];
    let fields = [];

    form.uploadDir = path.resolve(__dirname, '../upfiles');
    form.keepExtensions = true;
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
    
    form.parse(ctx.req, async function(err, fields, files) {
        // 文件重命名.
        let oldName = files.upload.path;
        let newName = oldName.replace('upload_', '');
        fs.renameSync(oldName, newName);
        fileName = newName;
        console.log(fileName);
        await ctx.render('upfile_save', {
            name: fileName
        });
    });

    await ctx.render('upfile_save', {
        name: fileName
    });
};

// module.exports = {
//     indexAction,
//     saveAction
// };

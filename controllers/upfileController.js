const cryptoTools = require('../tools/crypto');
const formidable = require('formidable');
const multer = require('koa-multer');
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
let fileName = '上传成功!';
exports.saveAction = async (ctx, next) => {
    let form = new formidable.IncomingForm();
    let files = [];
    let fields = [];

    form.uploadDir = path.resolve(__dirname, '../upfiles');
    form.keepExtensions = true;
    form
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
    
    form.parse(ctx.req, async function(err, fields, files) {
        // 文件重命名.
        let oldName = files.uploadName.path;
        let newName = oldName.replace('upload_', '');
        fs.renameSync(oldName, newName);
        console.log(newName);
    });

    await ctx.render('upfile_save', {
        name: fileName
    });
};

/**
 * 上传文件: multer.
 */
exports.multerAction = async (ctx, next) => {
    let obj = { name: 'saber', age: 26 };
    let str = 'chinease';
    await ctx.render('upfile_multer', {
        title: 'multer',
        objCrypto: `${JSON.stringify(obj)} - ${cryptoTools.hmacSha256(obj)}`,
        strMd5Crypto: `${str} - ${cryptoTools.hashMd5(str)}`
    });
};

/**
 * 上传文件: koa-multer config
 */
exports.multerConfig = () => {
    // 配置.
    let storage = multer.diskStorage({
        destination: function (req, file, cb) { // 文件保存路径.
            cb(null, path.resolve(__dirname, '../upfiles'));
        },
        filename: function (req, file, cb) { // 修改文件名称.
            let fileFormat = (file.originalname).split(".");
            let random = Math.random(0, 1) + Math.random(0, 100);
            let prefix = `koa-multer-${random}`;
            let suffix = fileFormat[fileFormat.length - 1];
            let fileName = `${cryptoTools.hashMd5(prefix)}.${suffix}`;
            cb(null, fileName);
        }
    });

    // 加载配置.
    return multer({ storage: storage });
};

/**
 * 上传文件: koa-multer
 */
exports.multerSaveAction = async (ctx, next) => {
    await ctx.render('upfile_multer_save', {
        fileName: ctx.req.file.filename
    });
};

// module.exports = {
//     indexAction,
//     saveAction
// };

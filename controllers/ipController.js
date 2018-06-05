const ipModule = require('../modules/ip');

/**
 * ip: 列表.
 */
exports.list = async function(ctx, next) {
    let onOff = true;
    let title = 'ip列表';
    let list = await ipModule.ipList().then(result => {
        return result;
    });

    await ctx.render('ip/list', {
        onOff,
        title,
        list
    });
};

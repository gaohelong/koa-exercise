const crypto = require('crypto');
const secret = '76a,.12';

/**
 * 加密: Hmac sha256.
 */
exports.hmacSha256 = (data) => {
    const hash = crypto.createHmac('sha256', secret)
        .update(JSON.stringify(data))
        .digest('hex');

    return hash;
};

/**
 * 加密: Hash md5.
 */
exports.hashMd5 = (data) => {
    const hash = crypto.createHash('md5')
        .update(data)
        .digest('hex');

    return hash;
};

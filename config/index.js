const env = 'dev';

let config;
if (env === 'dev') { // 开发.
    config = require('./dev');
} else if (env === 'test') { // 测试.
    config = require('./test');
} else { // 线上.
    config = require('./prod');
}

module.exports = config;

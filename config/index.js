console.log(process.env.customProcessEnv);

let config;
if (process.env.customProcessEnv === 'start') { // 开发.
    config = require('./start');
} else if (process.env.customProcessEnv === 'dev') { // 测试.
    config = require('./dev');
} else { // 线上.
    config = require('./prod');
}

module.exports = config;

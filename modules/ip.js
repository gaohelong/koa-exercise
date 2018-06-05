let query = require('../lib/mysql');

// 获取ip列表.
exports.ipList = () => {
    let sql = `SELECT * FROM ip ORDER BY id DESC LIMIT 2;`;
    return query(sql);
};

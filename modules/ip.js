let query = require('../lib/mysql');

// 获取ip列表.
exports.ipList = () => {
    // let values = [`' and 1=1`]; // 注入.
    let values = [6];
    let sql = `SELECT * FROM ip ORDER BY id DESC LIMIT ?;`;
    return query(sql, values);
};

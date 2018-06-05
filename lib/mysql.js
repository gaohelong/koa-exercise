let mysql = require('mysql');
const config = require('../config/');

let pool = mysql.createPool({
    host            : config.database.HOST,
    user            : config.database.USERNAME,
    password        : config.database.PASSWORD,
    database        : config.database.DATABASE,
    // port            : config.database.PORT,
    connectionLimit : config.database.CONNECTION_LIMIT
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                /**
                 * 显示格式化.
                 */
                let _sql = mysql.format(sql, values);
                connection.query(_sql, (err, rows, fileds) => {
                    let str = `' and 1=1`;
                    console.log('mysql.escape: ', mysql.escape(str));
                    console.log('connection.escape: ', connection.escape(str));
                    console.log('pool.escape: ', pool.escape(str));
                    console.log('sql: ', _sql);
                    // console.log('pool: ', pool);
                    // console.log('fileds:', fileds);

                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }

                    connection.release();
                });

                /**
                 * 隐示格式化
                connection.query(sql, values, (err, rows, fileds) => {
                    let str = `' and 1=1`;
                    console.log('mysql.escape: ', mysql.escape(str));
                    console.log('connection.escape: ', connection.escape(str));
                    console.log('pool.escape: ', pool.escape(str));
                    console.log('values: ', values);
                    console.log('sql: ', sql);
                    // console.log('pool: ', pool);
                    // console.log('fileds:', fileds);

                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }

                    connection.release();
                });*/
            }
        });
    })
};

module.exports = query;

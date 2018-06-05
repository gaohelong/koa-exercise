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

let query = ( sql, values ) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    })
};

module.exports = query;

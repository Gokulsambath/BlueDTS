/* *****************************************************************************************************************
    Class       : DBConnection
    Description : Wraps DB connection
    Author      : Prasoon
    Created On  : 13/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
const mySql = require('mysql');

class DBConnection {
    constructor() {
        console.log('DBConnection constructor called');
        if (!DBConnection.pool) {
            console.log('creating pool...');
            DBConnection.pool = mySql.createPool({
                connectionLimit: 1,
                host: 'dev.bluesecures.com',
                user: 'dev',
                password: 'Blue@1234',
                database: 'ejabberd'
            });
        }
    }
    getConnection() {
        return DBConnection.pool;
    }
}
module.exports = DBConnection
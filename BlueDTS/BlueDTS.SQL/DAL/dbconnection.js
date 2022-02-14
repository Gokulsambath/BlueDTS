/* *****************************************************************************************************************
    Class       : DBConnection
    Description : Creates new instance of mysql db connection
    Author      : Adarsh Dubey
    Created On  : 13/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
var dbconfig = require('../config/dbconfig');
const mySql = require('mysql');
var dbconnection = null;

class DBConnection {
    constructor() {
        console.log('MySql connection is started.....');
        dbconnection = mySql.createConnection({
            host: dbconfig.host,
            user: dbconfig.user,
            password: dbconfig.password,
            database: dbconfig.database,
            port: dbconfig.port
        });
    }


    async getDBConnection() {

        var testquery = 'select * from ejabberd.archive limit 1';
        dbconnection.query(testquery, function (err, result) {
            if (err) throw err
            //console.log(result);
        });
        return dbconnection;
    }
}
module.exports = DBConnection
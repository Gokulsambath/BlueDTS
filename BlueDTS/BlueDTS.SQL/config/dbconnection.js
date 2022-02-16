/* *****************************************************************************************************************
    Class       : DBConnection
    Description : Creates new instance of mysql db connection
    Author      : Adarsh Dubey
    Created On  : 13/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

var mysql = require('mysql');
var dbconnection = null;

class DatabaseConnPool {
    constructor() {
        
    }


    async initializeDefaultMySQLDB(dbConfig, dbName) {
        var host = dbConfig.server;
        var dbPort = dbConfig.port;
        var dbUser = dbConfig.user;
        var dbPwd = dbConfig.password;
        var poolSize = dbConfig.pool_size;
        var database = dbName;

        if (poolSize === null || poolSize === "" || poolSize === undefined) { poolSize = 5; }

        try {


            dbconnection = mysql.createConnection({
                host: host,
                user: dbUser,
                password: dbPwd,
                database: database,
                port: dbPort,
                connectionLimit: poolSize
            });


            await dbconnection.connect();

            console.log('SQL DB connection is successful!!!');
            return ({ success: true, result: dbconnection });
        }
        catch (err) {
            console.log('SQL DB connection is Failed !!!');
            return ({ success: false, result: err });
        }
    }

    async initializeDBConnection(AppConfig) {
        var result = {};
        result = await this.initializeDefaultMySQLDB(AppConfig.db_config, AppConfig.db_name);
        return result;
    }
};
module.exports = new DatabaseConnPool
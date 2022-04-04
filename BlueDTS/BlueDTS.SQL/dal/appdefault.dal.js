/* *****************************************************************************************************************
    Class       : DBConnection
    Description : Creates new instance of mysql db connection
    Author      : Adarsh Dubey
    Created On  : 13/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

var Config_BO = require("../bo/config/config.sql.bo");
const DBConn = require("../config/dbconnection");

const AppDBConfig = Config_BO.getAppDefaultDBSettings();

class AppDefaultDAL {
    _sqlDefaultDB = null;

    constructor() {
    }

    async getDefaultSQLDB() {

        if (this._sqlDefaultDB) return this._sqlDefaultDB;
        else {
            let result = {};
            //console.warn("Trying to initialize Application default mysql database....");
            var dbObj = await DBConn.initializeDBConnection(AppDBConfig);
            if (dbObj.success) {
                this._sqlDefaultDB = dbObj.result;
                return this._sqlDefaultDB;
            } else {
                return result;
            }
        }
    }
}

module.exports = AppDefaultDAL;
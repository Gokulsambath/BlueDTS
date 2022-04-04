var Config_BO = require("../bo/config/config.bo");
const DBConn = require("../config/dbconnection");


const AppDBConfig = Config_BO.getAppDefaultDBSettings();



class AppDefaultDAL {
    _mongoDefaultDB = null;
    _subscriberDB = [];

    constructor() {
    }


    get subscriberDB() {
        return this._subscriberDB;
    }

    set subscriberDB(subscriberDB) {
        this._subscriberDB = subscriberDB;
    }


    async getDefaultMongoDB() {
        if (this._mongoDefaultDB) return this._mongoDefaultDB;
        else {
            let result = {};
            //console.warn("Trying to initialize Application default mongo database....");
            var dbObj = await DBConn.initializeDBConnection(AppDBConfig);
            if (dbObj.success) {
                this._appDefaultDB = dbObj.result;
                return this._appDefaultDB;
            } else {
                return result;
            }
        }
    }
}

module.exports = AppDefaultDAL;

/* *****************************************************************************************************************
    Name        : Configurations BO
    Description : Business Obect of Configurations to provide
                    1. Get App default DB Settings
                    2. To map default app settings of DB
                  

    Author      : Adarsh Dubey
    Created On  : 08/08/2020

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
let AppDBConfig = require("../../../config/appDataStore/app.default.db.config");

class ConfigBO {

    _appDefaultDBSettings = null;

    constructor() {
        this.initAppDefaultConfigs();
    }

    initAppDefaultConfigs() {
        let sqlDB = (AppDBConfig || []).filter((key) => key.primary_db && key.db_option === "sql");
        sqlDB = sqlDB.length > 0 ? sqlDB[0] : sqlDB;
        this._appDefaultDBSettings = sqlDB;
    }

    getAppDefaultDBSettings() {
        return this._appDefaultDBSettings;
    }
}
module.exports = new ConfigBO()
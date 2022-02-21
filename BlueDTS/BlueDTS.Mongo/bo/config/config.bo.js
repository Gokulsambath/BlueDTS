/* *****************************************************************************************************************
    Name        : Configurations BO
    Description : Business Obect of Configurations to provide
                    1. Get App default DB Settings
                    2. To get subscriber specific DB Settings
                    3. To map default app settings of DB
                   

    Author      : Adarsh Dubey
    Created On  : 08/08/2020

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

var servEnv = require('../../../config/configServEnv');
let AppDBConfig = require("../../../config/appDataStore/app.default.db.config");

class ConfigBO {

    _appDefaultDBSettings = null;

    constructor() {
        this.initAppDefaultConfigs();
    }

    initAppDefaultConfigs() {

        //filter DB
        let regionDB = (AppDBConfig || []).filter((key) => key.primary_db && key.region === servEnv.defaultRegion && key.db_option === "mongo");
        regionDB = regionDB.length > 0 ? regionDB[0] : regionDB;

        this._appDefaultDBSettings = regionDB;
    }

    getAppDefaultDBSettings() {
        return this._appDefaultDBSettings;
    }

    mapAppDBToSubscriber(subscriber_id) {
        var subscriberDB = this._appDefaultDBSettings;

        return subscriberDB;
    }

    getDatabaseSettings(subscriber_id) {
        var subscriberDBSettings = null;
        if (!subscriber_id || subscriber_id === "default") {
            subscriberDBSettings = this.mapAppDBToSubscriber(subscriber_id);
            subscriberDBSettings.subscriber_id = subscriber_id;
            subscriberDBSettings.same_as_appDB = true;
        }

        else {
            
            // to add subscriber db logic
        }

        return subscriberDBSettings;
    }
}
module.exports = new ConfigBO()
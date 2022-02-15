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

let AppDBConfig = require("../config/appDataStore/app.default.db.config");

class ConfigBO {

    _appDefaultDBSettings = null;

    constructor() {
        this.initAppDefaultConfigs();
    }

    initAppDefaultConfigs() {

        //filter DB
        let regionDB = (AppDBConfig || []).filter((key) => key.primary_db && key.region === servEnv.defaultRegion);
        regionDB = regionDB.length > 0 ? regionDB[0] : regionDB;
        

        if (AppStoreConfig) AppStoreConfig = this.getDecryptedStoreConfigs(AppStoreConfig);

        regionDB = { ...regionDB, store_option: AppStoreConfig.store_option }
        this._appDefaultDBSettings = regionDB;
    }

    mapAppDBToSubscriber(subscriber_id) {
        var subscriberDB = this._appDefaultDBSettings;

        return subscriberDB;
    }

    getAppDefaultDBSettings() {
        return this._appDefaultDBSettings;
    }

    getDatabaseSettings(subscriber_id) {
        var subscriberDBSettings = null;
        if (!subscriber_id || subscriber_id === "default") {
            subscriberDBSettings = this.mapAppDBToSubscriber(subscriber_id);
            subscriberDBSettings.subscriber_id = subscriber_id;
            subscriberDBSettings.same_as_appDB = true;
        } else {
            let dbSetting = (this._dbSettings || []).filter((key) => key.subscriber_id === subscriber_id);
            dbSetting = dbSetting.length > 0 ? dbSetting[0] : null;
            if (!dbSetting) {
                subscriberDBSettings = this.mapAppDBToSubscriber(subscriber_id);
            } else {
                if (dbSetting.same_as_appDB) {
                    if (!dbSetting.same_as_appRegion) {
                        //filter DB
                        subscriberDBSettings = (AppDBConfig || []).filter((key) => key.primary_db && key.region === dbSetting.region);
                        subscriberDBSettings = subscriberDBSettings.length > 0 ? subscriberDBSettings[0] : subscriberDBSettings;
                        subscriberDBSettings = this.getDecryptedDBConfigs(subscriberDBSettings);
                    } else {
                        subscriberDBSettings = this.mapAppDBToSubscriber(subscriber_id);
                    }
                    subscriberDBSettings.subscriber_id = subscriber_id;
                    subscriberDBSettings.same_as_appDB = true;
                } else {
                    subscriberDBSettings = dbSetting;
                    subscriberDBSettings = this.getDecryptedDBConfigs(subscriberDBSettings);
                    subscriberDBSettings.container_name = subscriber_id;
                }
            }
        }

        return subscriberDBSettings;
    }
}
module.exports = new ConfigBO()
/* *****************************************************************************************************************
    Name        : Mongo DAL
    Description : Data Access Layer to access the Mongo

    Author      : Adarsh Dubey
    Created On  : 12/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

var DBMongo = require("./mongo.dao");
var Config_BO = require("../bo/config/config.bo");

class MongoDAL {

    constructor() {
    }


    async saveCacheRowData(subscriberId, rowData) {
        var result = {};

        //to do :logic to add the mongoserver db based on subscriberid
    
        var dbmongo = new DBMongo();
        var dbConfig = Config_BO.getDatabaseSettings(subscriberId);
        result = await dbmongo.createCacheData(dbConfig, rowData);
        return result;
    }

    async fetchCacheRows(subscriberId, to , from) {
        var result = {};

        //to do :logic to add the mongoserver db based on subscriberid

        var dbmongo = new DBMongo();
        var dbConfig = Config_BO.getDatabaseSettings(subscriberId);
        result = await dbmongo.getCacheData(dbConfig, to , from);
        return result;
    }

    async fetchCacheRows(subscriberId) {
        var result = {};

        //to do :logic to add the mongoserver db based on subscriberid

        var dbmongo = new DBMongo();
        var dbConfig = Config_BO.getDatabaseSettings(subscriberId);
        result = await dbmongo.getCacheData(dbConfig);
        return result;
    }

    async fetchSubscriberKey(subscriberId) {
        var result = {};

        //to do :logic to add the mongoserver db based on subscriberid

        var dbmongo = new DBMongo();
        var dbConfig = Config_BO.getDatabaseSettings(subscriberId);
        result = await dbmongo.getSubscriberKey(dbConfig, subscriberId);
        return result;
    }

    async fetchPreKeys(subscriberId, xmppUserId) {
        var result = {};

        //to do :logic to add the mongoserver db based on subscriberid

        var dbmongo = new DBMongo();
        var dbConfig = Config_BO.getDatabaseSettings(subscriberId);
        result = await dbmongo.getPreKeysData(dbConfig, xmppUserId);
        return result;
    }

    async fetchLastTimestamp(subscriberId) {
        var result = {};

        //to do :logic to add the mongoserver db based on subscriberid

        var dbmongo = new DBMongo();
        var dbConfig = Config_BO.getDatabaseSettings(subscriberId);
        result = await dbmongo.getTimestamp(dbConfig);
        return result;
    }

    async saveTimestampLog(subscriberId , log) {
        var result = {};

        //to do :logic to add the mongoserver db based on subscriberid

        var dbmongo = new DBMongo();
        var dbConfig = Config_BO.getDatabaseSettings(subscriberId);
        result = await dbmongo.saveTimestamp(dbConfig, log);
        return result;
    }

    async saveArchivalRowData(subscriberId, rowData) {
        var result = {};

        //to do :logic to add the mongoserver db based on subscriberid

        var dbmongo = new DBMongo();
        var dbConfig = Config_BO.getDatabaseSettings(subscriberId);
        result = await dbmongo.createRowData(dbConfig, rowData);
        return result;
    }

    async saveFailureLog(subscriberId, row) {
        var result = {};

        //to do :logic to add the mongoserver db based on subscriberid

        var dbmongo = new DBMongo();
        var dbConfig = Config_BO.getDatabaseSettings(subscriberId);
        result = await dbmongo.saveFailureLog(dbConfig, row);
        return result;
    }
}

module.exports = MongoDAL;
/* *****************************************************************************************************************
    Name        : Mongo BO
    Description : Business Object to handle mongo data crud interactions

    Author      : Adarsh
    Created On  : 08/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
var Mongo_DAL = require("../dal/mongo.dal");

class MongoBO {

    constructor()
    { }

    async storeData(subscriberId, data) {

        try {
            //todo
        } catch (err) {
            result = null;
        }
    }


    async pushCacheData(subscriberId, rowData) {

        var mongo_dal = new Mongo_DAL();
        var result = await mongo_dal.saveCacheRowData(subscriberId, rowData);
        return result;
    }


    async getCacheData(subscriberId, timestamp) {

        var mongo_dal = new Mongo_DAL();
        var result = await mongo_dal.fetchCacheRows(subscriberId, timestamp);
        return result;
    }


    async processCacheData(subscriberId) {

        var timestamp = null //todo : add the logic to assign the new timestamp on the basis of last successfull timestamp.

        var cachedRows = await this.getCacheData(subscriberId, timestamp);

        console.log(cachedRows.rows);
        return cachedRows;

        // add the iterator logic
        // add the xml processing logic here.
    }
}





module.exports = MongoBO;
/* *****************************************************************************************************************
    Class       : sqlbo
    Description : This files contains all the BL related to sql module
    Author      : Adarsh Dubey
    Created On  : 18/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

var MongoBO = require("../../BlueDTS.Mongo/bo/mongo.bo")

class SqlBo {

    constructor() { }

    async storeData(subscriberId, data) {

        try {
            //todo
        } catch (err) {
            result = null;
        }
    }


    async uploadCacheRow(newRow) {

       
        var mongo_bo = new MongoBO();
        var subscriberId = "default";
        var result = await mongo_bo.PushCacheData(subscriberId, newRow);
        return result;
    }

}
module.exports = SqlBo;
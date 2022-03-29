/* *****************************************************************************************************************
    Class       : sqlbo
    Description : This files contains all the BL related to sql module
    Author      : Adarsh Dubey
    Created On  : 18/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

var MongoBO = require("../../BlueDTS.Mongo/bo/mongo.bo");
var servEnv = require('../../config/configServEnv');
var ModelBuilder = require("../../BlueDTS.Mongo/helper/model.builder");

class SqlBo {

    constructor() { }

    async uploadCacheRow(newRow) {

        var mongo_bo = new MongoBO();
        var subscriberId = "default";
        //configurable retry count for row processing to store
        newRow.retryCount = servEnv.retryCount;
        var result = await mongo_bo.pushCacheData(subscriberId, newRow);
        return result;
    }

    processRowStatus(newRow) {
        // all buisness logic to decide for the row process status

        if (newRow.txt === "" || newRow.txt === null)
            return false;

        if (newRow.xml === "" || newRow.xml === null)
            return false;

        if (!this.validateSubject(newRow.xml))
            return false;

        return true;
    }

    validateSubject(xml) {

        var modelbuilder = new ModelBuilder();
        var xmlsubjectcontent = modelbuilder.createSubjectTag(xml);

        var subject = xmlsubjectcontent.getSubject();

        if (subject === null || subject === undefined || subject === '')
            return false;

        return true;
    }
}
module.exports = SqlBo;
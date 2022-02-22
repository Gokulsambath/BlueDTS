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


    setIterator(dataIterator) {
        this.iterator = dataIterator;
    }

    async uploadCacheRow(newRow) {

       
        var mongo_bo = new MongoBO();
        var subscriberId = "default";
        var result = await mongo_bo.pushCacheData(subscriberId, newRow);
        return result;
    }


    async initIterator() {
        this.setIterator(new Iterator());
        await this.iterator.setDataSource();
    }

    async processData() {
        var messages = [];
        await this.initIterator();
        while (this.iterator.hasNext()) {
            //1. code to get the data
            let data = iterator.next();
            //2. get xml content
            let xml = data.xml;
            //3. create models corresponding to the respective data
            let result = new XMLParser().getMsgXmlContent(xml);
            //4. add model into the array
            let err = result[0];
            if (!err) {
                let msg = new Message();
                //creating msg from result array
                msg.setTo(result[1]);
                msg.setFrom(result[2]);
                msg.setType(result[3]);
                msg.setId(result[4]);
                messages.push(msg);
            }
        }
        return messages;
    }


}
module.exports = SqlBo;
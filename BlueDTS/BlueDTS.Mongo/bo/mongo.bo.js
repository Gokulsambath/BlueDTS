/* *****************************************************************************************************************
    Name        : Mongo BO
    Description : Business Object to handle mongo data crud interactions

    Author      : Adarsh Dubey
    Created On  : 08/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
var Mongo_DAL = require("../dal/mongo.dal");
var Crypto_LIB = require("../../BlueDTS.Library/crypto/crypto");
var servEnv = require('../../config/configServEnv');
var Signal_BO = require("./signal.bo");
const Iterator = require('../helper/iterator');
const MessageModelBuilder = require('../helper/model.builder')

class MongoBO {

    constructor() { }

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

    async decryptSubKey(subKey) {

        var encryptionkey = servEnv.encryptMessageKey
        var crypto_lib = new Crypto_LIB();
        var hash = crypto_lib.encryptToHash(subKey, encryptionkey);
        return hash;
    }

    async encryptwithBuisnessKey(message, encryptionkey) {

        var crypto_lib = new Crypto_LIB();
        var hash = crypto_lib.encryptToHash(message, encryptionkey);
        return hash;
    }

    async decryptMessageBody(subscriberId ,cipherText, toId, FromId) {

        var plainText = "";
        var mongo_dal = new Mongo_DAL();
        if (cipherText !== "") {
            var ownerPrekeyResult = await mongo_dal.fetchPreKeys(subscriberId, toId);

            if (ownerPrekeyResult.status) {
                var ownerPrekey = ownerPrekeyResult.result;

                var selfPrekeyResult = await mongo_dal.fetchPreKeys(subscriberId, FromId);
                if (selfPrekeyResult.status) {

                    var selfPrekey = selfPrekeyResult.result;
                    plainText = await this.decryptSignalCipherText(cipherText, ownerPrekey, selfPrekey);
                    return plainText;
                }
            }
            else {
                return plainText;
            }
        }
        else {
            return plainText;
        }
    }

    async decryptSignalCipherText(cipherText, ownerPrekey, selfPrekey) {

        var signal_bo = new Signal_BO();        
        var messageobj = await signal_bo.decryptMessage(cipherText, ownerPrekey, selfPrekey);
        return messageobj.result;    
    }

    async processCacheData(subscriberId) {

        var timestamp = null //todo : add the logic to assign the new timestamp on the basis of last successfull timestamp.

        var cachedRows = await this.getCacheData(subscriberId, timestamp);

        console.log(cachedRows.rows);

        let iterator = new Iterator();
        iterator.setDataSource(cachedRows.rows);
        let result = [];

        while (iterator.hasNext()) {
            let data = iterator.next();
            console.log(data.xml);
            let msgbuilder = new MessageModelBuilder();
            try {
                let msg = await msgbuilder.createMessage(data);
                let body = msg.getMessageBody();
                if (body != null || body) {
                    console.log(body);
                    body = await this.decryptMessageBody(body);
                    body = await this.encryptMessageBody(body);
                    msg.setMessageBody(body);
                }
                console.log(msg);
                result.push(msg);
            }
            catch (err) {
                console.log('logging error: ');
                console.log(err);
                console.log('error reported while parsing xml');
            }
        }
        return result;
    }

    async encryptMessageBody(subscriberId, plaintext) {

        var result = "";
        var mongo_dal = new Mongo_DAL();
        var subkeyresult = await mongo_dal.fetchSubscriberKey(subscriberId);

        if (subkeyresult.status) {

            var decryptedSubkey = await this.decryptSubKey(subkeyresult.subscriberKey);
            var ciphertext = await this.encryptwithBuisnessKey(plaintext, decryptedSubkey);
            return ciphertext;
        }
        return result;
    }

}
module.exports = MongoBO;
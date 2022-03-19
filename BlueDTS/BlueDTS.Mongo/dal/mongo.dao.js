/* *****************************************************************************************************************
    Name        : Mongo DB DAO
    Description : Mongo DB DAO

    Author      : Adarsh Dubey
    Created On  : 08/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
const CacheCollectionId = "EjabberdArchivalCache";
const DTSProcessLogCollectionId = "DTSProcessLog";
const EjabberdArchivalCollectionId = "EjabberdArchival";
const SubscriberCollectionId = "Subscriber";
const PreKeysCollectionId = "PreKeys";

var DBConnPool = require('../config/dbconnection');

class MongoDAO {

    _dbMongo = null;
    _cacheCollection = null;
    _dTSProcessLogCollection = null;
    _ejabberdArchivalCollection = null;
    _subscriberCollection = null;
    _preKeysCollection = null;


    constructor() {

    }

    async initializeContainer(dbConfig) {
        this._dbMongo = await DBConnPool.getSubscriberDB(dbConfig);
        this._cacheCollection = await this._dbMongo.collection(CacheCollectionId);
        this._dTSProcessLogCollection = await this._dbMongo.collection(DTSProcessLogCollectionId);
        this._ejabberdArchivalCollection = await this._dbMongo.collection(EjabberdArchivalCollectionId);
        this._subscriberCollection = await this._dbMongo.collection(SubscriberCollectionId);
        this._preKeysCollection = await this._dbMongo.collection(PreKeysCollectionId);
    }

    /* ***************************** GETTERS & SETTERS ********************************************* */
    get dbMongo() {
        return this._dbMongo;
    }

    set dbMongo(dbMongo) {
        this._dbMongo = dbMongo;
    }

    get cacheCollection() {
        return this._cacheCollection;
    }

    set cacheCollection(cacheCollection) {
        this._cacheCollection = cacheCollection;
    }

    get dTSProcessLogCollection() {
        return this._dTSProcessLogCollection;
    }

    set dTSProcessLogCollection(dTSProcessLogCollection) {
        this._dTSProcessLogCollection = dTSProcessLogCollection;
    }

    get ejabberdArchivalCollection() {
        return this._ejabberdArchivalCollection;
    }

    set ejabberdArchivalCollection(ejabberdArchivalCollection) {
        this._ejabberdArchivalCollection = ejabberdArchivalCollection;
    }

    get subscriberCollection() {
        return this._subscriberCollection;
    }

    set subscriberCollection(subscriberCollection) {
        this._subscriberCollection = subscriberCollection;
    }

    get preKeysCollection() {
        return this._preKeysCollection;
    }

    set preKeysCollection(preKeysCollection) {
        this._preKeysCollection = preKeysCollection;
    }

    /* ************************** MONGODAL CRUD ******************************************* */

    async createCacheData(dbConfig, newRow) {
        var result = null;
        var objOutput = { rowID: null};

        try {
            if (this._cacheCollection === null) { await this.initializeContainer(dbConfig); }
            this._cacheCollection.upsert = true;

            var cacheResult = await this._cacheCollection.insertOne(newRow);

            objOutput.rowID = cacheResult.insertedId.toString();
            result = { status: true, result: objOutput };
        }
        catch (err) {
            result = { status: false, result: err };
        }
        return result;
    }

    async getCacheData(dbConfig, toTS , fromTS) {
        var result = null;
        var findFilter = {};
        
        try {

            if (this._cacheCollection === null) { await this.initializeContainer(dbConfig); }

            findFilter.timestamp = { $gte: fromTS, $lte: toTS };
          
            var foundItems = await this._cacheCollection.find(findFilter).toArray();

            result = { status: true, rows: foundItems };
        }
        catch (err) {
            result = { status: false, result: err };
        }
        return result;
    }

    async saveTimestamp(dbConfig, log) {
        var result = null;
        var findFilter = {};
        var objOutput = { ProcessId: null };

        try {
            if (this._dTSProcessLogCollection === null) { await this.initializeContainer(dbConfig); }
            this._dTSProcessLogCollection.upsert = true;

           
            // disposing the last successfull timestamp in the collection
            findFilter.latest = true;
            findFilter.status = 'S';

            var foundItem = await this._dTSProcessLogCollection.findOne(findFilter);

            var updateId = await this._dTSProcessLogCollection.updateOne({ _id: foundItem._id }, { $set: { latest: false , status : 'P' } });

            // set the current row as latest processed object having successful timestamp
            var cacheResult = await this._dTSProcessLogCollection.insertOne(log);

            objOutput.ProcessId = cacheResult.insertedId.toString();

            var updateId = await this._dTSProcessLogCollection.updateOne({ _id: cacheResult.insertedId }, { $set: { processId: objOutput.ProcessId } });

            result = { status: true, result: objOutput };
        }
        catch (err) {
            result = { status: false, result: err };
        }
        return result;
    }

    async getTimestamp(dbConfig) {
        var result = null;
        var findFilter = {};

        try {

            if (this._dTSProcessLogCollection === null) { await this.initializeContainer(dbConfig); }

            findFilter.latest = true;
            findFilter.status = 'S';
            
            var foundItem = await this._dTSProcessLogCollection.findOne(findFilter);

            if (foundItem)
                result = { status: true, timestamp: foundItem.timestamp };
            else
                result = { status: false, timestamp: null };
        }
        catch (err) {
            result = { status: false, result: err };
        }
        return result;
    }

    async getSubscriberKey(dbConfig, subscriberId) {
        var result = null;
        var findFilter = {};

        try {

            if (this._subscriberCollection === null) { await this.initializeContainer(dbConfig); }

            findFilter.subscriberId = subscriberId;
           
            var foundItem = await this._subscriberCollection.findOne(findFilter);

            if (foundItem)
                result = { status: true, subscriberKey: foundItem.subscriberKey };
            else
                result = { status: false, subscriberKey: null };
        }
        catch (err) {
            result = { status: false, result: err };
        }
        return result;
    }

    async createRowData(dbConfig, newRows , rowscount) {
        var result = null;
       
        try {
            if (this._ejabberdArchivalCollection === null) { await this.initializeContainer(dbConfig); }
            this._ejabberdArchivalCollection.upsert = true;

            var cacheResult = await this._ejabberdArchivalCollection.insert(newRows);

            if (cacheResult.nInserted === rowscount)
                result = { status: true };
            else
                result = { status: false };
        }
        catch (err) {
            result = { status: false, result: err };
        }
        return result;
    }

    async getPreKeysData(dbConfig, xmppUserId) {
        var result = null;
        var findFilter = {};

        try {

            if (this._preKeysCollection === null) { await this.initializeContainer(dbConfig); }

            findFilter.xmppUserId = xmppUserId;

            var foundItem = await this._preKeysCollection.findOne(findFilter);

            if (foundItem)
                result = { status: true, result: foundItem };
            else
                result = { status: false, subscriberKey: null };
        }
        catch (err) {
            result = { status: false, result: err };
        }
        return result;
    }
}
module.exports = MongoDAO
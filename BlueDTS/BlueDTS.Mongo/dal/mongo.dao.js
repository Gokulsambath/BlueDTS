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

var DBConnPool = require('../config/dbconnection');

class MongoDAO {

    _dbMongo = null;
    _cacheCollection = null;
    _dTSProcessLogCollection = null;
    _ejabberdArchivalCollection = null;


    constructor() {

    }

    async initializeContainer(dbConfig) {
        this._dbMongo = await DBConnPool.getSubscriberDB(dbConfig);
        this._cacheCollection = await this._dbMongo.collection(CacheCollectionId);
        this._dTSProcessLogCollection = await this._dbMongo.collection(DTSProcessLogCollectionId);
        this._ejabberdArchivalCollection = await this._dbMongo.collection(EjabberdArchivalCollectionId);
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

    async getCacheData(dbConfig, timestamp) {
        var result = null;
        var findFilter = {};
        
        try {

            if (this._cacheCollection === null) { await this.initializeContainer(dbConfig); }

            //findFilter.timestamp = timestamp;
            //var foundItems = await this._msgCollection.find(findFilter);

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

            findFilter.Latest = true;
            findFilter.Status = 'S';

            var foundItem = await this._dTSProcessLogCollection.findOne(findFilter);

            var updateId = await this._dTSProcessLogCollection.updateOne({ _id: foundItem.insertedId }, { $set: { Latest: false , Status : 'P' } });

            // set the current row as latest processed object having successful timestamp
            var cacheResult = await this._dTSProcessLogCollection.insertOne(log);

            objOutput.ProcessId = cacheResult.insertedId.toString();

            var updateId = await this._dTSProcessLogCollection.updateOne({ _id: cacheResult.insertedId }, { $set: { ProcessId: objOutput.ProcessId } });

            objOutput.rowID = cacheResult.insertedId.toString();
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

            findFilter.Latest = true;
            findFilter.Status = 'S';
            
            var foundItem = await this._dTSProcessLogCollection.findOne(findFilter);

            if (foundItem)
                result = { status: true, timestamp: foundItem.Timestamp };
            else
                result = { status: true, timestamp: null };
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
}
module.exports = MongoDAO
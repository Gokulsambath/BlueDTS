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
var DBConnPool = require('../config/dbconnection');

class MongoDAO {

    _dbMongo = null;
    _cacheCollection = null;


    constructor() {

    }

    async initializeContainer(dbConfig) {
        this._dbMongo = await DBConnPool.getSubscriberDB(dbConfig);
        this._cacheCollection = await this._dbMongo.collection(CacheCollectionId);
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
}
module.exports = MongoDAO
"use strict";

/* *****************************************************************************************************************
    Name        : log Model 
    Description : Entity to hold log data related to data transfer transactions.

    Author      : Adarsh Dubey
    Created On  : 20/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */


class TransactionLogModel {

    _processId = null;
    _timestamp = null;
    _createdAt = null;
    _status = null;
    _latest = null;


    // Constructors & Mappings
    constructor() {

    }


    get processId() {
        return this._processId;
    }

    set processId(processId) {
        this._processId = processId;
    }

    get timestamp() {
        return this._timestamp;
    }

    set timestamp(timestamp) {
        this._timestamp = timestamp;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(createdAt) {
        this._createdAt = createdAt;
    }

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }

    get latest() {
        return this._latest;
    }

    set latest(latest) {
        this._latest = latest;
    }
};

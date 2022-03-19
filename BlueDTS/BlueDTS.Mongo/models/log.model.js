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

    processId = null;
    timestamp = null;
    createdAt = null;
    status = null;
    latest = null;


    // Constructors & Mappings
    constructor() {

    }


    get processId() {
        return this.processId;
    }

    set processId(processId) {
        this.processId = processId;
    }

    get timestamp() {
        return this.timestamp;
    }

    set timestamp(timestamp) {
        this.timestamp = timestamp;
    }

    get createdAt() {
        return this.createdAt;
    }

    set createdAt(createdAt) {
        this.createdAt = createdAt;
    }

    get status() {
        return this.status;
    }

    set status(status) {
        this.status = status;
    }

    get latest() {
        return this.latest;
    }

    set latest(latest) {
        this.latest = latest;
    }
};

module.exports = TransactionLogModel;

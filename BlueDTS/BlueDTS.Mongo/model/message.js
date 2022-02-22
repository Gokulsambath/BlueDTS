/* *****************************************************************************************************************
    Class       : Message
    Description : represents XML message content
    Author      : 
    Created On  : 14/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
const xml2js = require("xml2js")

class Message {
    constructor(xml) {
        //contains code to construct message from the given xml
        this.parsingErrorFlag = false;
        //let msgObj = {};
        xml2js.parseString(xml, function (err, resultObj) {
            if (!err) {
                //msgObj = result;
                this.to = resultObj.message.$.to;
                this.from = resultObj.message.$.to;
                this.type = resultObj.message.$.type;
                this.id = resultObj.message.$.id;
            }
            else this.parsingErrorFlag = true;
        });
    }

    //setters
    setTo(to) {
        this.to = to;
    }

    setFrom(from) {
        this.from = from;
    }

    setType(type) {
        this.type = type;
    }

    setId(id) {
        this.id = id;
    }

    //getters
    getTo() {
        return this.to;
    }

    getFrom() {
        return this.from;
    }

    getType() {
        return this.type;
    }

    getId() {
        return this.id;
    }
}
module.exports = Message
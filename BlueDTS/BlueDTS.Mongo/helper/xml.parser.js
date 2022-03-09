/* *****************************************************************************************************************
    Class       : XMLParser
    Description : Pefroms Application specific parsing
    Author      :
    Created On  : 14/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
const xml2js = require('xml2js');

class XMLParser {

    _xmlObj;
    _success;

    constructor() {

    }

    isParsed() {
        return this._success;
    }

    valExists(obj) {

        if (obj && obj != null) {
            return true;
        }
        else {
            return false;
        }
    }

    msgExists() {

        if (this.isParsed() && this.valExists(this._xmlObj['message']) && this.valExists(this._xmlObj['message']['$'])) {
            return true;
        }
        else {
            return false;
        }
    }

    toExists() {
        
        if (this.msgExists() && this.valExists(this._xmlObj['message']['$']['to'])) {
            return true;
        }
        else {
            return false;
        }
    }

    fromExists() {

        if (this.msgExists() && this.valExists(this._xmlObj['message']['$']['from'])) {
            return true;
        }
        else {
            return false;
        }
    }

    typeExists() {

        if (this.msgExists() && this.valExists(this._xmlObj['message']['$']['type'])) {
            return true;
        }
        else {
            return false;
        }
    }

    idExists() {

        if (this.msgExists() && this.valExists(this._xmlObj['message']['$']['id'])) {
            return true;
        }
        else {
            return false;
        }
    }

    bodyExists() {

        if (this.isParsed() && this.valExists(this._xmlObj['message']) && this.valExists(this._xmlObj['message']['body'])) {
            return true;
        }
        else {
            return false;
        }
    }

    receiveTagExists() {

        if (this.msgExists() && this.valExists(this._xmlObj['message']['received']) ) {
            return true;
        }
        else {
            return false;
        }
    }

    recievedIdPropertyExists() {

        if (this.receiveTagExists() &&
                this.valExists(this._xmlObj['message']['received'][0]) &&
                this.valExists(this._xmlObj['message']['received'][0]['$']) &&
                this.valExists(this._xmlObj['message']['received'][0]['$']['id'])) {
            return true
        }
        else {
            return false;
        }
    }

    async parseString(xml) {

        var status = false;
        var obj = null;
        await xml2js.parseString(xml, function (err, resultObj) {
            if (!err) {
                status = true;
                obj = resultObj;
            }
        });
        this._success = status;
        this._xmlObj = obj;
    }

     parseTo() {

        if (this.toExists()) {
            return this._xmlObj['message']['$']['to'];
        }
        else {
            return null;
        }
    }

     parseFrom() {

        if (this.fromExists()) {
            return this._xmlObj['message']['$']['from'];
        }
        else {
            return null;
        }
    }

    parseSubscriberId() {

        var subscriberId = null;
        var ids = [];
        if (this.idExists()) {
            var id = this._xmlObj['message']['$']['id'];
            if (id.indexOf(':') > -1) {
                ids = id.split(':');
                if (this.valExists(ids) && this.valExists(ids.length) && ids.length >= 2 ) {
                    subscriberId = ids[1];
                }
            }
        }
        return subscriberId;
    }

    parseChatId() {

        var chatId = null;
        var ids = [];
        if (this.idExists()) {
            var id = this._xmlObj['message']['$']['id'];
            if (id.indexOf(':') > -1) {
                ids = id.split(':');
                if (this.valExists(ids) && this.valExists(ids.length) && ids.length > 0) {
                    chatId = id.split(':')[0];
                }
            }
        }
        return chatId;
    }

    parseType() {

        if (this.typeExists()) {
            return this._xmlObj['message']['$']['type'];
        }
        else {
            return null;
        }
    }

    parseId() {

        if (this.idExists()) {
            return this._xmlObj['message']['$']['id'];
        }
        else {
            return null;
        }
    }

    parseBody() {

        if (this.bodyExists() && this.valExists(this._xmlObj['message']['body'].length)
            && this._xmlObj['message']['body'].length >= 1) {
            return this._xmlObj['message']['body'][0];
        }
        else {
            return null;
        }
        
    }
}
module.exports = XMLParser;
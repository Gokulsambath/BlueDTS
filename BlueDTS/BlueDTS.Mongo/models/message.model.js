/* *****************************************************************************************************************
    Class       : Message
    Description : represents message content
    Author      : 
    Created On  : 14/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
const xml2js = require("xml2js")

class Message {
    constructor() {
    }
    //setters
    setContent(xmlContent) {
        //replace content with xml
        this.content = xmlContent;
        //return this;
    }

    getContent() {
        return this.content;
    }

    setUsername(username) {
        this.username = username;
        //return this;
    }

    getUsername() {
        return this.username;
    }

    setTimestamp(t) {
        this.timestamp = t;
        //return this;
    }

    getTimestamp() {
        return this.timestamp;
    }

    setPeer(peer) {
        this.peer = peer;
        //return this;
    }

    getPeer() {
        return this.peer;
    }

    setBarePeer(barepeer) {
        this.barepeer = barepeer;
        //return this;
    }

    getBarePeer() {
        return this.barepeer;
    }

    setTxt(txt) {
        this.txt = txt;
        //return this;
    }

    getTxt() {
        return this.txt;
    }

    setId(id) {
        this.id = id;
        //return this;
    }

    getId() {
        return this.id;
    }

    setKind(kind) {
        this.kind = kind;
        //return this;
    }

    getKind() {
        return this.kind;
    }

    setNick(nick) {
        this.nick = nick;
        //return this;
    }

    getNick() {
        return this.nick;
    }

    setCreatedAt(created_at) {
        this.created_at = created_at;
        //return this;
    }

    getCreatedAt() {
        return this.created_at;
    }

    setMessageBody(body) {
        this.content.setBody(body);
        //return this;
    }

    getMessageBody() {
        return this.content.getBody();
    }
}
module.exports = Message;
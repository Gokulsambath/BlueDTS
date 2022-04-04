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

class TextMsgModel {

    receivers = [];
    attachmentSize = null;
    chatType = null;
    subscriberId = null;
    dateTime = null;
    linkType = null;
    linkedMessageId = null;
    messageAction = null;
    messageAlignment = null;
    messageHolderId = null;
    messageText = null;
    messageType = null;
    orgnizationId = null;
    overallMsgStatus = null;
    receiverXmppId = null;
    senderXmppId = null;
    userAgent = null;
    xmppChatId = null;
    xmppMessageId = null;
    size = null;
    messageId = null;

    constructor() {
    }
    /**************************SETTERS******************************************************************/

    set setAttachmentSize(attachmentSize) {
        this.attachmentSize = attachmentSize;
    }

    set setChatType(chatType) {
        this.chatType = chatType;
    }

    set setDateTime(datetime) {
        this.dateTime = datetime;
    }

    set setLinkType(linktype) {
        this.linkType = linktype;
    }

    set setLinkedMessageid(linkedMessageId) {
        this.linkedMessageId = linkedMessageId;
    }

    set setMessageAction(messageAction) {
        this.messageAction = messageAction;
    }

    set setMessageAlignment(messageAlignment) {
        this.messageAlignment = messageAlignment;
    }

    set setMessageHolderId(messageHolderId) {
        this.messageHolderId = messageHolderId;
    }

    set setMessageText(messageText) {
        this.messageText = messageText;
    }

    set setMessageType(messageType) {
        this.messageType = messageType;
    }

    set setOrgnizationId(orgnizationId) {
        this.orgnizationId = orgnizationId;
    }

    set setOverallMsgStatus(overallMsgStatus) {
        this.overallMsgStatus = overallMsgStatus;
    }

    set setReceiverXmppId(receiverXmppId) {
        this.receiverXmppId = receiverXmppId;
    }

    set setSenderXmppId(senderXmppId) {
        this.senderXmppId = senderXmppId;
    }

    set setSender(sender) {
        this.sender = sender;
    }

    set setSubscriberId(subscriberId) {
        this.subscriberId = subscriberId;
    }

    set setUserAgent(userAgent) {
        this.userAgent = userAgent;
    }

    set setXmppChatId(xmppChatId) {
        this.xmppChatId = xmppChatId;
    }

    set setXmppMessageId(xmppMessageId) {
        this.xmppMessageId = xmppMessageId;
    }

    set setSize(size) {
        this.size = size;
    }
    set setMessageId(messageId) {
        this.messageId = messageId;
    }


    addReciever(reciever) {
        this.recievers.push(reciever);
    }

    /***************************************GETTER***************************************************************/
   
    get getAttachmentSize() {
        return this.size;
    }

    get getChatType() {
        return this.chatType;
    }

    get getDateTime() {
        return this.dateTime;
    }

    get getLinkType() {
        return this.linkType;
    }

    get getLinkedMessageid() {
        return this.linkedMessageId;
    }

    get getMessageAction() {
        return this.messageAction ;
    }

    get getMessageAlignment() {
        return this.messageAlignment ;
    }

    get getMessageHolderId() {
        return this.messageHolderId;
    }

    get getMessageText() {
        return this.messageText;
    }

    get getMessageType() {
        return this.messageType;
    }

    get getOrgnizationId() {
        return this.orgnizationId;
    }

    get getOverallMsgStatus() {
        return this.overallMsgStatus;
    }

    get getReceiverXmppId() {
        return this.receiverXmppId ;
    }

    get getSenderXmppId() {
        return this.senderXmppId;
    }

    get getSender() {
        return this.sender ;
    }

    get getSubscriberId() {
        return this.subscriberId;
    }

    get getUserAgent() {
        return this.userAgent ;
    }

    get getXmppChatId() {
        return this.xmppChatId ;
    }

    get getXmppMessageId() {
        return this.xmppMessageId ;
    }

    get getSize() {
        return this.size ;
    }

    get getRecievers() {
        return this.receivers;
    }
    get getMessageId() {
        this.messageId;
    }
}

module.exports = TextMsgModel;
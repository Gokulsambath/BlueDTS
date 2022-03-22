/* *****************************************************************************************************************
    Class       : ModelBuilder
    Description : Responsible for creating message
    Author      :
    Created On  : 14/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
var XMLContent = require('../models/xmlcontent.model');
const XMLParser = require('../helper/xml.parser');
var MsgModel = require('../models/message.model');

class MessageModelBuilder {
    constructor() {
    }

    async createMessageModel(data) {

        var result = await this.createXMLContent(data.xml);
        var msgModel = new MsgModel.Message();
        var reciever = new MsgModel.Reciever();

        if (result.success) {
            var content = result.content;

            msgModel.subscriberId = content.getSubscriberId();
            msgModel.chatType = content.getType();

            //one-to-one model processing
            if (msgModel.chatType !== null && msgModel.chatType === 'chat') {

                msgModel.senderXmppId = content.getFrom();

            }// group chat processing
            else if (msgModel.chatType !== null && msgModel.chatType === 'groupchat') {

                msgModel.xmppGroupId = content.getFrom();
            }
            else
                msgModel.chatType = "";

            //setting sender
            {
                msgModel.sender.deletedFlag = false;
                msgModel.sender.forwardAllowedFlag = 0;
                msgModel.sender.senderId = content.getFrom();
                msgModel.sender.senderMsgStatus = 0;
                msgModel.sender.sentDateTime = 0;

            }

            //setting reciever
            {
                reciever.deletedFlag = false;
                reciever.deliveredDateTime = 0;
                reciever.receiverId = content.getFrom();
                reciever.receiverMsgStatus = 0;
                reciever.tags = [];
                msgModel.reciever.push(reciever);
            }

            //settings subject contents
            {
                var subject = JSON.parse(content.getSubject());

                if (subject !== null) {

                    if (subject.messageFormat === "text") {
                        // for text message
                    }
                    else if (subject.messageFormat === "audio") {

                        msgModel.attachment.caption = subject.caption;
                        msgModel.attachment.fileName = subject.fileName;
                        msgModel.attachment.fileType = subject.fileType;
                        msgModel.attachment.storageRefId = subject.storageRefId;
                        msgModel.attachment.storageBlobURL = subject.storageBlobURL;
                        msgModel.attachment.thumbnailUrl = subject.thumbnailUrl;
                        msgModel.attachmentSize = subject.attachmentSize;
                    }
                    else if (subject.messageFormat === "contact") {

                        msgModel.attachmentSize = subject.attachmentSize;
                        for (const con of subject.contacts) {

                            var contact = new MsgModel.Contacts();
                            contact.contactName = con.contactName;
                            contact.contactNumber = con.contactNumber;
                            contact.contactPic = con.contactPic;
                            msgModel.contacts.push(contact);
                        }
                    }

                    msgModel.messageType = subject.messageFormat;
                    msgModel.dateTime = subject.messageDateTime;                   
                    msgModel.linkedMessageId = subject.linkedMessageId;
                    msgModel.messageHolderId = subject.messageHolderId;
                }
            }

            msgModel.linkType = 'NL';
            msgModel.orgnizationId = '01';
            msgModel.overallMsgStatus = '2';
            msgModel.receiverXmppId = content.getTo();          
            msgModel.xmppChatId = content.getTo();
            msgModel.xmppMessageId = content.getId();
            msgModel.messageText = content.getBody();
        }
        return msgModel;
    }

    

    async createXMLContent(xml) {

        var xmlcontent = new XMLContent();
        var status = true;
        var appParser = new XMLParser();
        await appParser.parseString(xml);
        xmlcontent.setTo(appParser.parseTo());
        xmlcontent.setFrom(appParser.parseFrom());
        xmlcontent.setType(appParser.parseType());
        xmlcontent.setId(appParser.parseId());
        xmlcontent.setSubscriberId(appParser.parseSubscriberId());
        xmlcontent.setChatId(appParser.parseChatId());
        xmlcontent.setBody(appParser.parseBody());
        xmlcontent.setSubject(appParser.parseSubject());
        return { success: status, content: xmlcontent };
    }
}

module.exports = MessageModelBuilder;
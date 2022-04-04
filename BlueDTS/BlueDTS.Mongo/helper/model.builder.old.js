const Message = require('../models/message.model');
const XMLContent = require('../models/xmlcontent.model');
const XMLParser = require('../helper/xml.parser');


class MessageModelBuilder {
    constructor() {
    }

    async createMessage(data) {

        var msg = new Message();
        var result = await this.createXMLContent(data.xml);
        //setting message attributes
        msg.setId(data.id);
        msg.setUsername(data.username);
        msg.setTimestamp(data.timestamp);
        msg.setPeer(data.peer);
        msg.setBarePeer(data.bare_peer);
        msg.setTxt(data.txt);
        msg.setKind(data.kind);
        msg.setNick(data.nick);
        msg.setCreatedAt(data.created_at);
        if (result.success) {
            msg.setContent(result.content);
        }
        return msg;
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
        return { success: status, content: xmlcontent };
    }
}

module.exports = MessageModelBuilder;
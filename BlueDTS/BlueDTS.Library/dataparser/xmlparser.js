const xml2js = require("xml2js")

class XMLParser {
    //constructor
    constructor() {
    }

    getMsgXmlContent(xml) {
        var msgResult = [];
        xml2js.parseString(xml, function (err, resultObj) {
            msgResult.push(err);
            if (!err) {
                msgResult.push(resultObj.message.$.to);
                msgResult.push(resultObj.message.$.from);
                msgResult.push(resultObj.message.$.type);
                msgResult.push(resultObj.message.$.id);
            }
        });
        return msgResult;
    }
}
module.exports = XMLParser
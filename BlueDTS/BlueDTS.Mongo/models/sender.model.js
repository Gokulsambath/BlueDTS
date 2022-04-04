class Sender {
    constructor() {

    }

    /************************Setter*******************************************/

    set setDeletedFlag(deletedFlag) {
        this.deletedFlag = deletedFlag;
    }

    set setSentDateTime(sentDateTime) {
        this.sentDateTime = sentDateTime;
    }


    set setSenderId(senderId) {
        this.senderId = senderId;
    }

    set setSenderMsgStatus(senderMsgStatus) {
        this.senderMsgStatus = senderMsgStatus;
    }

    set setForwardAllowedFlag(forwarAllowedFlag) {
        this.forwardAllowedFlag = forwarAllowedFlag;
    }

    /*******************************Getters************************************************/
    get getDeletedFlag() {
        return this.deletedFlag;
    }

    get getSentDateTime() {
        return this.sentDateTime;
    }

    get getSenderId() {
        return this.senderId;
    }

    get getSenderMsgStatus() {
        return this.senderMsgStatus;
    }

    get getForwardAllowedFlag() {
        return this.forwardAllowedFlag;
    }
}
module.exports = Sender;
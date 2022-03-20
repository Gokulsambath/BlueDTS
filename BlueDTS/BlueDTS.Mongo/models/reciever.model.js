class Reciever {

    tags = [];
    constructor() {

    }

    /************************Setter*******************************************/

    set setDeletedFlag(deletedFlag) {
        this.deletedFlag = deletedFlag;
    }

    set setDeliveredDateTime(deliveredDateTime) {
        this.deliveredDateTime = deliveredDateTime;
    }


    set setReceiverId(receiverId) {
        this.receiverId = receiverId;
    }

    set setReceiverMsgStatus(receiverMsgStatus) {
        this.receiverMsgStatus = receiverMsgStatus;
    }

    addTag(tag) {
        tags.push(tag);
    }

    /*******************************Getters************************************************/
    get getDeletedFlag() {
        return this.deletedFlag;
    }

    get getDeliveredDateTime() {
        return this.deliveredDateTime;
    }

    get getReceiverId() {
        return this.receiverId;
    }

    get getReceiverMsgStatus() {
        return this.receiverMsgStatus;
    }

    get getTags() {
        return this.tags;
    }
}
module.exports = Reciever;
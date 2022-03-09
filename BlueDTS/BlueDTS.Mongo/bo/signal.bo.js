var libsignal = require("../../libsignal-node/index")
var Crypto_LIB = require("../../BlueDTS.Library/crypto/crypto");
const BaseKeyType = require('../../libsignal-node/src/base_key_type');
var base64buffer = require('base64-arraybuffer');
var store = null;


class SignalBO {

    constructor() {
       
    }

    initializeMethod(xmppUserId, deviceId) {
        var crypto_lib = new Crypto_LIB();
        store = crypto_lib.generateStoreIdentityEncrypt(deviceId);
        store = crypto_lib.generatePreKeyBundleEncrypt();
    }

    uploadSession(address) {
        var registrationId = store.getRegistrationId();
        var record = new libsignal.SessionRecord(registrationId);
        var session = {
            registrationId: registrationId,
            currentRatchet: {
                rootKey: new ArrayBuffer(32),
                lastRemoteEphemeralKey: new ArrayBuffer(32),
                previousCounter: 0
            },
            indexInfo: {
                baseKey: new ArrayBuffer(32),
                baseKeyType: BaseKeyType.OURS,
                remoteIdentityKey: new ArrayBuffer(32),
                closed: -1
            },
            oldRatchetList: []
        };
        record.updateSessionState(session);
        store.storeSession(address.toString(), record);
    }

    uploadIdentity(identifier, identityKey) {

        store.saveIdentity(identifier, identityKey)
    }

    async decryptMessage(recipientId = myId, deviceId = myId, ciphertext) {
        try {

            this.initializeMethod(recipientId, deviceId);

            var bufferctext64 = this.base64ToArrayBuffer(ciphertext);

            var bufferctext = Buffer.from(bufferctext64, "binary");

            //var bufferctext = ciphertext;

            var address = new libsignal.ProtocolAddress(recipientId, deviceId);
            var sessionCipher = new libsignal.SessionCipher(store, address);

            // Decrypt a PreKeyWhisperMessage by first establishing a new session.
            // Returns a promise that resolves when the message is decrypted or
            // rejects if the identityKey differs from a previously seen identity for this
            // address.
            sessionCipher.decryptPreKeyWhisperMessage(bufferctext64).then(function (plaintext) {
                // handle plaintext ArrayBuffer
                console.log("Decrypted Text", plaintext);
            }).catch(function (error) {
                // handle identity key conflict
                console.log("Error on Decryption", error)
            });

            // Decrypt a normal message using an existing session
            var sessionCipher = new libsignal.SessionCipher(store, address);
            sessionCipher.decryptWhisperMessage(bufferctext).then(function (plaintext) {
                // handle plaintext ArrayBuffer
                console.log("Decrypted Text", plaintext);
            }).catch(function (error) {
                // handle identity key conflict
                console.log("Error on Decryption", error)
            });
        } catch (error) {
            console.log(error);
        }
    }

    async encryptMessage(recipientId, deviceId) {
        try {

            this.initializeMethod(recipientId, deviceId);

            var bufferctext = Buffer.from("This is a sample text", "utf-8");

            var address = new libsignal.ProtocolAddress(recipientId, deviceId);
            
            //encrypt signal logic
            var sessionCipher = new libsignal.SessionCipher(store, address);

            this.uploadSession(address);
            this.uploadIdentity(address.id, new ArrayBuffer(32));


            sessionCipher.encrypt(bufferctext).then(function (ciphertext) {
                // ciphertext -> { type: <Number>, body: <string> }
                handle(ciphertext.type, ciphertext.body);
                console.log("Encrypted Text", ciphertext);
            });
        } catch (error) {
            console.log(error)
        }
    }

    base64ToArrayBuffer = (base64) => {
        return base64buffer.decode(base64);
    }

}
module.exports = SignalBO;
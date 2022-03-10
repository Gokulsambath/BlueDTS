/* *****************************************************************************************************************
    Name        : Cryptographic
    Description : package to handle all the cryptographic activities in dts
    Author      : Adarsh Dubey
    Created On  : 25/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */


var cryptLib = require('@skavinvarnan/cryptlib');
var protocol_store = require("../crypto/protocol_store");
var base64buffer = require('base64-arraybuffer');
var store = new protocol_store();

class CryptoLib {

   
    constructor() {
        
    }

    encryptToHash(message, key) {

        var result = null;
        try {
            result = cryptLib.encryptPlainTextWithRandomIV(message, key);
        }
        catch (err) {
            result = "";
        }

        return result;
    }

    base64ToArrayBuffer = (base64) => {
        return base64buffer.decode(base64);
    }

    generatePreKeyBundleEncrypt(xmppuserId, deviceId) {

        ////////

        var result = store.getIdentityKeyPair()

        let identity = result[0];

        let registrationId = '';

        let preKeyId = 15076220;
        let signedPreKeyId = 13001821;

        // let preKeyIdApi = "";
        let preKeyIdpubKey = "";
        let preKeyIdprivKey = "";

        let signedpubKey = "";
        let signedprivKey = "";
        let signatures = ""

        {

            registrationId = 3333;
            //deviceId = preKeyBunch.docs[0].deviceId;

            // preKeyIdApi = preKeyBunch.docs[0].preKeyRecords[0].preKeyId;
            preKeyIdpubKey = "BYhDahniDsvzz11F86u1v65L+qOmdOgplHbBwkhT0kIA";
            preKeyIdpubKey = this.base64ToArrayBuffer(preKeyIdpubKey);
            preKeyIdprivKey = "+DD5+qaJgIO0xPGV4RLXCcqMhxHbZbRaLfRY0rg2jmI=";
            preKeyIdprivKey = this.base64ToArrayBuffer(preKeyIdprivKey);

            signedprivKey = "mLmmdpKdXBm5uYBaEuefoXLETHnKct2taq+1npn13kA=";
            signedprivKey = this.base64ToArrayBuffer(signedprivKey);
            signedpubKey = "Bd8gwcJgaBHmXVy2r+vHYa5WpNpZYJh3UXc25JTh/rgM"
            signedpubKey = this.base64ToArrayBuffer(signedpubKey);
            signatures = "CkFNh5TzLzS3HkI4NvTaIG2EcC/WQT2KQL32+RVeD+8G5+xpXEuBIZ+FL0Ppdbku2KLcQU...";
            signatures = this.base64ToArrayBuffer(signatures);
        }


        let preKey = { "keyId": preKeyId, "keyPair": { "privKey": preKeyIdprivKey, "pubKey": preKeyIdpubKey } };

        let signedPreKey = { "keyId": signedPreKeyId, "keyPair": { "privKey": signedprivKey, "pubKey": signedpubKey }, "signature": signatures };

        store.storePreKey(preKeyId, preKey.keyPair);
        store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair);

        return store;

        ////////
        //return {
        //    registrationId: registrationId,
        //    deviceId: deviceId,
        //    identityKey: identity.pubKey,
        //    signedPreKey: {
        //        keyId: signedPreKeyId,
        //        publicKey: signedPreKey.keyPair.pubKey,
        //        signature: signedPreKey.signature
        //    },
        //    preKey: {
        //        keyId: preKeyId,
        //        publicKey: preKey.keyPair.pubKey

        //    }
        //};

    }

    generateStoreIdentityEncrypt() {

        //var idenity= // fetch logic add here

        let identityPrivateKey = "AC9hLLIs2cYL5cIi1/FLwcPayzBfuHQwhn4cim3g61Q=";
        let identityPublicKey = "BWx/HTGAHeM1TJNjnS592As5PbewWqYOOEftqR6N3oZp";

        let registrationId = 3333;

        identityPrivateKey = this.base64ToArrayBuffer(identityPrivateKey);
        identityPublicKey = this.base64ToArrayBuffer(identityPublicKey);

        let actIdentityKey = { "privKey": identityPrivateKey, "pubKey": identityPublicKey };

        let para = actIdentityKey;

        if (identityPublicKey.byteLength === 32) {
            para = this.processKeys(actIdentityKey);
        }

        store.put('identityKey', para);
        store.put('registrationId', registrationId);

        return store;
    }

    processKeys = (raw_keys) => {
        var origPub = new Uint8Array(raw_keys.pubKey);
        var pub = new Uint8Array(33);
        pub.set(origPub, 1);
        pub[0] = 5;

        return { pubKey: pub.buffer, privKey: raw_keys.privKey };
    }

    registerNewPreKeyBundle(userId, preKeyBundle) {

        store[userId] = preKeyBundle;
    }

    getPreKeyBundle(userId) {
        store[userId];
    }
}

module.exports = CryptoLib;



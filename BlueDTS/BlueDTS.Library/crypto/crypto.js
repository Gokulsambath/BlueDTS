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

        let preKeyId = 1761280;
        let signedPreKeyId = 2287575;

        // let preKeyIdApi = "";
        let preKeyIdpubKey = "";
        let preKeyIdprivKey = "";

        let signedpubKey = "";
        let signedprivKey = "";
        let signatures = ""

        {

            registrationId = 15306;
            //deviceId = preKeyBunch.docs[0].deviceId;

            // preKeyIdApi = preKeyBunch.docs[0].preKeyRecords[0].preKeyId;
            preKeyIdpubKey = "BbEPGi8P02pB99vzXhRdtS0PtAYMMTMueLiQR7Ll8f4/";
            preKeyIdpubKey = this.base64ToArrayBuffer(preKeyIdpubKey);
            preKeyIdprivKey = "0EkWP/wAVjJwvCPP3ij6DOOx9k/UipNaAvzlss58yGM=";
            preKeyIdprivKey = this.base64ToArrayBuffer(preKeyIdprivKey);

            signedprivKey = "sNG3ZINdZF5Xx5fmeO7VDwwA1HdiSlmqSeBrmARQsmo=";
            signedprivKey = this.base64ToArrayBuffer(signedprivKey);
            signedpubKey = "BTFdHpWUOQJvyPwKdMkqTPHHweZU0IFGgMKuJysi4/xB"
            signedpubKey = this.base64ToArrayBuffer(signedpubKey);
            signatures = "96Sk5u+7qv9W52Hk3eZe8bM67Q2aNuqPo5YsqgCVdq7Ozktqra3+gKblWZvxz29LyavVUZ...";
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

        let identityPrivateKey = "KPiI3tsE/+zjBwnlPZ7G11XBmVwDWiQ8MQ+Vrkcjb0o=";
        let identityPublicKey = "BQRjsM19F3pNsYE5TqCEcNFbLdVwycSlNDBp2GUBthBn";

        let registrationId = 3024;

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



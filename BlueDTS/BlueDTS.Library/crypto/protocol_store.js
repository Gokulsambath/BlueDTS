var Util = require('../../libsignal-node/src/helpers');
var protocol_address = require('../../libsignal-node/src/protocol_address')

class ProtocolStore {

    constructor() {

        this.store = {};
    }

/*---------------------------------------  UTILITY ------------------------------------------------------------*/
    get(key, defaultValue) {
        if (key === null || key === undefined)
            throw new Error("Tried to get value for undefined/null key");
        if (key in this.store) {
            return this.store[key];
        } else {
            return defaultValue;
        }
    }

    put(key, value) {
        if (key === undefined || value === undefined || key === null || value === null)
            throw new Error("Tried to store undefined/null");
        this.store[key] = value;
    }

    remove(key) {
        if (key === null || key === undefined)
            throw new Error("Tried to remove value for undefined/null key");
        delete this.store[key];
    }


 /*---------------------------------------  SESSION ------------------------------------------------------------*/
    loadSession(identifier) {
        return this.get('session' + identifier);
    }

    storeSession(identifier, record) {
        return this.put('session' + identifier, record);
    }

  /*---------------------------------------  IDENTITY ------------------------------------------------------------*/
    getIdentityKeyPair() {
        return this.get('identityKey');
    }

    loadIdentityKey(identifier) {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to get identity key for undefined/null key");
        return this.get('identityKey' + identifier);
    }

    getRegistrationId() {
        return this.get('registrationId');
    }

    isTrustedIdentity(identifier, identityKey, direction) {
        if (identifier === null || identifier === undefined) {
            throw new Error("tried to check identity key for undefined/null key");
        }
        if (!(identityKey instanceof ArrayBuffer)) {
            throw new Error("Expected identityKey to be an ArrayBuffer");
        }
        var trusted = this.get('identityKey' + identifier);
        if (trusted === undefined) {
            return true;
        }

        var util = new Util();
        return util.toString(identityKey) === util.toString(trusted);
    }

    saveIdentity(identifier, identityKey) {

        if (identifier === null || identifier === undefined)
            throw new Error("Tried to put identity key for undefined/null key");

        var addrFromString = new protocol_address();
        var address = addrFromString.fromString(identifier);

        var existing = this.get('identityKey' + address.getName());
        this.put('identityKey' + address.getName(), identityKey)

        var util = new Util();
        if (existing && util.toString(identityKey) !== util.toString(existing)) {
            return true;
        } else {
            return false;
        }
    }

/*---------------------------------------  PRE KEYS ------------------------------------------------------------*/

    storePreKey(keyId, keyPair) {
        this.put('25519KeypreKey' + keyId, keyPair);
    }

    storeSignedPreKey(keyId, keyPair) {
        this.put('25519KeysignedKey' + keyId, keyPair);
    }

    loadPreKey(keyId) {
        var res = this.get('25519KeypreKey' + keyId);
        if (res !== undefined) {
            res = { pubKey: res.pubKey, privKey: res.privKey };
        }
        return res;
    }

    loadSignedPreKey(keyId) {
        var res = this.get('25519KeysignedKey' + keyId);
        if (res !== undefined) {
            res = { pubKey: res.pubKey, privKey: res.privKey };
        }
        return Promise.resolve(res);
    }

    removePreKey(keyId) {
        return this.remove('25519KeypreKey' + keyId);
    }
}
module.exports = ProtocolStore;
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


class CryptoLib {

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
}

module.exports = CryptoLib;



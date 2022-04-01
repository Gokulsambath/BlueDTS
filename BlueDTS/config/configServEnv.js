
var configServerEnv = {
    environment: 'development', //values: development  OR uat OR production
    hostName: 'localhost',
    httpsPort: 8443,
    httpPort: 6633,
    protocol: 'both',  // values: http OR https OR both
    timeZone: 'Asia/Kolkata',
    defaultRegion: 'US',
    encryptMessageKey: "rqWabc29JQR",
    timestampInterval: 10,
    retryCount: 3,
    restrictedUsernames: [],
    restrictedBarepeers: ['blueappuser@dev.bluesecures.com']
}

module.exports = configServerEnv;


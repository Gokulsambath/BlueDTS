
var configServerEnv = {
    environment: 'development', //values: development  OR uat OR production
    hostName: 'localhost',
    httpsPort: 8442,
    httpPort: 6632,
    protocol: 'both',  // values: http OR https OR both
    timeZone: 'Asia/Kolkata',
    defaultRegion: 'US',
    encryptMessageKey: "rqWabc29JQR",
    timestampInterval: 10,
    retryCount: 3,
    restrictedUsernames: ['blueappuser'],
    restrictedBarepeers: ['blueappuser']
}

module.exports = configServerEnv;


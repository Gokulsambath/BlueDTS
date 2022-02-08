const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');


const connection = mysql.createConnection({
    host: 'dev.bluesecures.com',
    user: 'dev',
    password: 'Blue@1234',
    database: 'ejabberd'
});


const instance = new MySQLEvents(connection, {
    startAtEnd: true,
    excludedSchemas: {
        mysql: true,
    },
});

myInstance.start()
    .then(() => console.log('I\'m running!'))
    .catch(err => console.error('Something bad happened', err));


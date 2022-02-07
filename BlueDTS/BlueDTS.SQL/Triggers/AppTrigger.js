var MySQLEvents = require('mysql-events');

var dsn = {
    host: 'localhost',
    user: 'username',
    password: 'password'
};
var myCon = MySQLEvents(dsn);
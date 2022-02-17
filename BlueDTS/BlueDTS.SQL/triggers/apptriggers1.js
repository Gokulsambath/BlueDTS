var MySQLEvents = require('mysql-events');
var dsn = {
    host: 'pocejcall.bluesecures.com',
    user: 'ejabberd',
    password: 'Blue@1234',
};
var mysqlEventWatcher = MySQLEvents(dsn);

var watcher = mysqlEventWatcher.add(
    'ejabberd.TestEventTable',
    function (oldRow, newRow) {
        console.log('something is happening');
        //row inserted
        if (oldRow === null) {
            console.log('insert');
        }

        //row deleted
        if (newRow === null) {
            console.log('delete');
        }

        //row updated
        if (oldRow !== null && newRow !== null) {
            console.log('update');
        }
    }

);


watcher.trigger();
console.log("connected and monitoring");
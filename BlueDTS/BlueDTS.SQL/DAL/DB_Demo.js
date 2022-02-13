const mySql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

/*
var pool = mySql.createPool({
    connectionLimit : 1,
    host            : 'dev.bluesecures.com',
    user            : 'dev',
    password        : 'Blue@1234',
    database        : 'ejabberd'
  });
var query = 'select * from ejabberd.archive where timestamp = 1637681859787947'; 
pool.query(query,function(err,result,fields) {
    if(err) throw err;
    console.log(result);
});
console.log('reached end');
*/


const connection = mySql.createConnection({
    host: 'pocejcall.bluesecures.com',
    user: 'ejabberd',
    password: 'Blue@1234',
    database: 'ejabberd',
    port: 3306
});


connection.query('select * from ejabberd.archive where timestamp = 1637681859787947', function (err, result1) {
    if (err) throw err
    console.log(result1);
});
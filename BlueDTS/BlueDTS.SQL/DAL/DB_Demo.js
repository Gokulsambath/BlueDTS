var mySql = require('mysql');
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
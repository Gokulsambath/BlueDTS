var ZongJi = require('zongji');
const dbconfig = require("../config/dbconfig");



var zongji = new ZongJi({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    debug: true
});



zongji.on('binlog', function (evt) {
    evt.dump();
});
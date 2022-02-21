/* *****************************************************************************************************************
    Name        : SQL Application Trigger
    Description : This trigger keep a watch on mysql tables and execute an event based on CRUD signal

    Author      : Adarsh Dubey
    Created On  : 04/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

var MySQLEvents = require('mysql-events');
const dbconfig = require("../config/dbconfig");
var SqlBO = require("../../BlueDTS.SQL/bo/sql.bo")
var dsn = null;

class apptriggers {

    constructor() {

        dsn = {
            host: dbconfig.host,
            user: dbconfig.user,
            password: dbconfig.password
        };
    }



    async apptriggerinitialization(){

        var mysqlEventWatcher = MySQLEvents(dsn);

        var watcher = mysqlEventWatcher.add(
            dbconfig.apptriggertable,
            async function (oldRow, newRow, event) {
                console.log('Trigger has been executed....\n');
                //row inserted
                if (oldRow === null) {
                    console.log('inserted new row');
                    console.log(newRow.fields);

                    var Sql_BO = new SqlBO();
                    var result = await Sql_BO.uploadCacheRow(newRow.fields);
                    console.log(result);
                }

                //row deleted
                if (newRow === null) {
                    console.log('delete');
                }

                //row updated
                if (oldRow !== null && newRow !== null) {
                    console.log('update');
                }

                //detailed event information
                //console.log(event); // don't matter, it updates, delete or insert
            }
        );
    }
}
module.exports = apptriggers;



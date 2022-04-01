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
                    console.log('inserted new row in ejjaberd.archive');
                    console.log(newRow.fields);

                    var Sql_BO = new SqlBO();
                    if (newRow.fields) {

                        var rowProcessStatus = Sql_BO.processRowStatus(newRow.fields);
                        if (rowProcessStatus) {
                            var result = await Sql_BO.uploadCacheRow(newRow.fields);
                            console.log(result);
                        }
                        else
                            console.log("row is failed to validate as per policy.");
                    }
                    else
                        console.log("row is not eligble to get processed.");
                }

                //row deleted
                if (newRow === null) {

                    //trigger for delete
                }

                //row updated
                if (oldRow !== null && newRow !== null) {
                  //trigger for update
                }

                //detailed event information
                //console.log(event); // don't matter, it updates, delete or insert
            }
        );
    }
}
module.exports = apptriggers;



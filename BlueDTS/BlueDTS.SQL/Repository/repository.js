/* *****************************************************************************************************************
    Class       : Repository
    Description : Implements repostiory
    Author      : Adarsh Dubey
    Created On  : 08/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

//const DBConnection = require("../dal/dbconnection")
const AppDefaultDAL = require("../dal/appdefault.dal");

class Repository {
    constructor() {
        console.log('creating repository ...');
        this.connObject = AppDefaultDAL().getDefaultSQLDB();
        this.query = 'select * from ejabberd.archive where timestamp = 1637681859787947';

        var result = readArchivalData();
    }
    async initProperties() {
        this.connObject = (await new AppDefaultDAL().getDefaultSQLDB()).getConnection();
        this.query = 'select * from ejabberd.archive where timestamp = 1637681859787947';
        console.log('repository created ...');
    }

    readArchivalData() {
        console.log('Repository::readArchivaldata-->enter');
        let result = [];
        let erroFlag = false;
        //this.initProperties();
        this.connObject.query(this.query, function (err, rows, fields) {
            if (err) {
                errorFlag = true;
                console.log('error occurred while processing query');
            }
            result.push(errorFlag);
            result.push(rows);
            console.log('****');
            console.log(rows);
            //console.log(result);
        });
        console.log('Repository::readArchivaldata-->exit');
        return result;
    }

}
module.exports = Repository
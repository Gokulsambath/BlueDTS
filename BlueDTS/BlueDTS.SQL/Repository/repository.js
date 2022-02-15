/* *****************************************************************************************************************
    Class       : Repository
    Description : Implements repostiory
    Author      : Adarsh Dubey
    Created On  : 08/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

const DBConnection = require("./dbconnection")

class Repository {
    constructor() {
        console.log('creating repository ...');
        this.connObject = new DBConnection().getConnection();
        this.query = 'select * from ejabberd.archive where timestamp = 1637681859787947';
        console.log('repository created ...');
    }

    readArchivalData() {
        this.connObject.query(this.query, function (err, result, fields) {
            if (err) console.log('error occurred while processing query');
            else console.log(result);
        })
    }
}
module.exports = Repository
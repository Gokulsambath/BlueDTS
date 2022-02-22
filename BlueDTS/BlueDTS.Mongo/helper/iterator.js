/* *****************************************************************************************************************
    Class       : Iterator
    Description : Implements standard iterator for the db result set
    Author      : Adarsh Dubey
    Created On  : 08/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
const RepositorySingleton = require("../repository/repository.singleton");

class Iterator {
    constructor() {

    }

    async setDataSource() {
        console.log('setting data source');
        this.repo = new RepositorySingleton().getInstance();
        console.log('breakpoint 1');
        var result = await this.repo.readArchivalData();
        console.log('breakpoint 2');
        this.rows = result[0];
        console.log('printing result');
        console.log(this.rows);
        console.log('breakpoint 4');
        this.curr_pos = 0;
    }

    //each call to next shall return the next data item
    next() {
        let data = this.rows[this.curr_pos];
        this.curr_pos++;
        return data;
    }

    hasNext() {
        return this.curr_pos < this.rows.length;
    }
}
module.exports = Iterator
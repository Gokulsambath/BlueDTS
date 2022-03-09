/* *****************************************************************************************************************
    Class       : Iterator
    Description : Implements standard iterator for the db result set
    Author      : Adarsh Dubey
    Created On  : 08/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
class Iterator {
    constructor() {
    }

    async setDataSource(rows) {
        this.dataSource = rows;
        this.curr_pos = 0;
    }

    //each call to next shall return the next data item
    next() {
        let data = this.dataSource[this.curr_pos];
        this.curr_pos++;
        return data;
    }

    hasNext() {
        return this.curr_pos < this.dataSource.length;
    }
}
module.exports = Iterator
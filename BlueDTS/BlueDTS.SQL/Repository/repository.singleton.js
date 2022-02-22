/* *****************************************************************************************************************
    Class       : RepositorySingleton
    Description : Implements Singleton
    Author      : Adarsh Dubey
    Created On  : 08/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

const Repository = require("./repository")

class RepositorySingleton {
    constructor() {
    }
    getInstance() {
        if (!RepositorySingleton.instance) {
            RepositorySingleton.instance = new Repository();
        }
        return RepositorySingleton.instance;
    }
}
module.exports = RepositorySingleton

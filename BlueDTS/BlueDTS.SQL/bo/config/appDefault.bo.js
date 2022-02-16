const AppDefaultDAL = require("../../dal/appdefault.dal");

class SQLAppDefaultBO {
    constructor() {
    }

    async getAppDefaultMySQLDB() {
        let appdefault_dal = new AppDefaultDAL();
        let default_DB = await appdefault_dal.getDefaultSQLDB();
        return default_DB
    }
}

module.exports = SQLAppDefaultBO;
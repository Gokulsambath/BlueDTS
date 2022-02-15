const AppDefaultDAL = require("../../dal/appdefault.dal");

class AppDefaultBO {
    constructor() {

    }

    async getAppDefaultMongoDB() {
        let appdefault_dal = new AppDefaultDAL();
        let default_DB = await appdefault_dal.getDefaultMongoDB();
        return default_DB
    }
}

module.exports = AppDefaultBO;
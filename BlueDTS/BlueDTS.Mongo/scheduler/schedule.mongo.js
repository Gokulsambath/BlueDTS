var CronJob = require('cron').CronJob;
const MongoBo = require('../bo/mongo.bo');
const servEnv = require("../../config/configServEnv");
var { cronRange } = require('../../config/constants/constants');


class Scheduler {

    constructor() {

    }


    startJob = async () => {


        var processdts = new CronJob(cronRange.ProcessDTSTick, async function () {
            var mongo_bo = new MongoBo();

            var jobresult = await mongo_bo.processCacheData("default");

            if (jobresult)
                console.log("dts job processed successfully");
            console.log("dts job processed.");
        }, null, true, servEnv.timeZone);

        processdts.start();
    }    
}
module.exports = Scheduler;
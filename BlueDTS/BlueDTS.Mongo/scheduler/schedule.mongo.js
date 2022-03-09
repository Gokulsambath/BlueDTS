const cron = require("node-cron");
const MongoBo = require('../bo/mongo.bo');


class Scheduler {

    constructor() {

    }

    scheduleMinute(minute) {

    }

    scheduleSecond(seconds) {

    }

    getTask() {
        return () => {
            console.log("running a task every 10 second");
            let m = new MongoBo();
            console.log('testing processCacheData');
            m.processCacheData().
                then(function (value) {
                    console.log('hello world');
                });
            console.log('tested processCacheData');
        }
    }

    start() {

        cron.schedule("*/10 * * * * *", this.getTask());
    }
}
module.exports = Scheduler;
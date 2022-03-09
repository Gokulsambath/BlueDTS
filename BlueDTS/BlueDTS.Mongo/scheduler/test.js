const cron = require("node-cron");
const MongoBo = require('../bo/mongo.bo');
const Scheduler = require('../scheduler/schedule.mongo');

// Creating a cron job which runs on every 10 second
//cron.schedule("*/10 * * * * *", function () {
//    console.log("running a task every 10 second");
//    let m = new MongoBo();
//    console.log('testing processCacheData');
//    m.processCacheData().
//        then(function (value) {
//            console.log('hello world');
//        });
//    console.log('tested processCacheData');
//});

var scheduler = new Scheduler();
scheduler.start();
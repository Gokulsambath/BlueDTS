/* *****************************************************************************************************************
    Name        : SQL Application Trigger
    Description : This trigger keep a watch on mysql tables and execute an event based on CRUD signal

    Author      : Adarsh Dubey
    Created On  : 04/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */


const sqldbconnection = require('../dal/dbconnection');
const mysqlevent = require('@rodrigogs/mysql-events');




const program = async () => {

    //#region Initializing MYSql dbconnection

    var dbconn = new sqldbconnection();
    const dbconnection = (await dbconn.initializeDBConnection()).result;

    //#endregion 


    const instance = new mysqlevent(dbconnection, {
        startAtEnd: true,
        excludedSchemas: {
            mysql: true,
        },
    });

    dbconnection.query('select * from ejabberd.archive where timestamp = 1637681859787947', function (err, result1) {
        if (err) throw err

        console.log(result1);
    });

    await instance.start()
        .then(() => console.log('I\'m running!'))
        .catch(err => console.error('Something bad happened', err));

    instance.addTrigger({
        name: 'OPERATIONS',
        expression: 'ejabberd.test',
        statement: mysqlevent.STATEMENTS.INSERT,
        onEvent: (event) => {
            console.log(event)
            console.log("new rows added")
            io.emit('operationReceived', event)
        },
    })

    instance.on(mysqlevent.EVENTS.CONNECTION_ERROR, console.error)
    instance.on(mysqlevent.EVENTS.ZONGJI_ERROR, console.error)
}


program()
    .then(() => console.log('Waiting for database vents...'))
    .catch(console.error)
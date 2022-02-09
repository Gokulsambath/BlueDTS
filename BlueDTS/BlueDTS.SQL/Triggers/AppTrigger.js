const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');


const connection = mysql.createConnection({
    host: 'dev.bluesecures.com',
    user: 'dev',
    password: 'Blue@1234',
    database: 'ejabberd',
    port: 3306
});

const program = async () => {
    const instance = new MySQLEvents(connection, {
        startAtEnd: true,
        excludedSchemas: {
            mysql: true,
        },
    });

    await instance.start()
        .then(() => console.log('I\'m running!'))
        .catch(err => console.error('Something bad happened', err));

    instance.addTrigger({
        name: 'OPERATIONS',
        expression: 'ejabberd.archive',
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: (event) => {
            console.log(event)
            console.log("new rows added")
            io.emit('operationReceived', event)
        },
    })

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error)
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error)
}


program()
    .then(() => console.log('Waiting for database vents...'))
    .catch(console.error)
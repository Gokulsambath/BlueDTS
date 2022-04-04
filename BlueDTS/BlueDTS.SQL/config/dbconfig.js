/* *****************************************************************************************************************
    Name        : SQL Database Configuration
    Description : This config properties needs to be updated accordingly with the deployed environments

    Author      : Adarsh Dubey
    Created On  : 04/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */




const DefaultSQLDB = {
    // host: 'pocejcall.bluesecures.com',
    // user: 'deskfactoradmin',
    // password: 'Deskf@ctor?123',
    host: 'dev.bluesecures.com',
    user: 'ejabberd',
    password: 'BlueDF@1234',
    database: 'ejabberd',
    port: 3306,
    apptriggertable: 'ejabberd' + '.' + 'archive',
};


//const DefaultSQLDB = {
//    host: 'localhost',
//    user: 'dev',
//    password: 'Aviator$1007',
//    database: 'deskfactors',
//    apptriggertable: 'deskfactors'+'.'+'testevent',
//    port: 3306
//};

module.exports = DefaultSQLDB;
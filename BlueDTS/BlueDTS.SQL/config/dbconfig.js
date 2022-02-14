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
    host: 'pocejcall.bluesecures.com',
    user: 'ejabberd',
    password: 'Blue@1234',
    database: 'ejabberd',
    port: 3306
};

module.exports = DefaultSQLDB;
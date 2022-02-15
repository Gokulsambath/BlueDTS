/* *****************************************************************************************************************
    Name        : MONGODB Database Configuration
    Description : This config properties needs to be updated accordingly with the deployed environments

    Author      : Adarsh Dubey
    Created On  : 04/02/2022

    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */
const AppDefaultDB = {

    
    
    "db_config": {
        "server": "BlueDF1234@devdb.bluesecures.com",
        "port": 27017,
        "user": "",
        "password":""
    },
    "db_name": "BlueSecuresDB_US"
};

module.exports = AppDefaultDB;
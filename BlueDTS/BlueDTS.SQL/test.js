let testDBConnection = false;
let testRepository = false;
let testSingleton = true;

if (testDBConnection) {
    console.log('testing DBConnection...');
    const DBConnection = require("./dbconnection");
    let conn1 = new DBConnection();
    let conn2 = new DBConnection();
    cosnole.log('DBConnection tested');
}

if (testRepository) {
    console.log('testing Repository...');
    const Repository = require("./repository");
    let repo = new Repository();
    repo.readArchivalData();
    console.log('Repository tested...')
}

if (testSingleton) {
    console.log('testing singleton...');
    const RepositorySingleton = require("./repository.singleton");
    let r1 = new RepositorySingleton();
    let r2 = new RepositorySingleton();
    let repo1 = r1.getInstance();
    console.log('singleton tested...');
}
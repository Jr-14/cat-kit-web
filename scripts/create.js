import sqlite3 from "sqlite3";

const BASE_PATH = "./db";
const FILE_NAME = "testDb.sqlite";
const dbFilePath = `${BASE_PATH}/${FILE_NAME}`;

const createCatTable = (db) => {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS Cats (
    id INTEGER NOT NULL PRIMARY KEY
    , microchip TEXT
    , name TEXT
    , description TEXT
    , dateOfBirth TEXT
    , sex TEXT
    , breed TEXT
);`;

    db.serialize(() => {
        db.run(createTableQuery);
    });
};

const run = async () => {
    const db = new sqlite3.Database(dbFilePath);

    createCatTable(db);

    db.close();
};

run();

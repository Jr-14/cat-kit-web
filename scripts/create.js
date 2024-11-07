import sqlite3 from "sqlite3";

const BASE_PATH = "./db";
const FILE_NAME = "testDb.sqlite";
const dbFilePath = `${BASE_PATH}/${FILE_NAME}`;

const createCatTable = (db) => {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS Cats (
    id INTEGER NOT NULL PRIMARY KEY
    , microchip TEXT
    , name TEXT NOT NULL
    , description TEXT
    , dateOfBirth TEXT
    , sex TEXT NOT NULL
    , breed TEXT
);`;

    db.serialize(() => {
        db.run(createTableQuery);
    });
};

const deleteCatTable = (db) => {
    const deleteTableQuery = `DROP TABLE IF EXISTS Cats;`;

    db.serialize(() => {
        db.run(deleteTableQuery);
    });
};

const run = async () => {
    const db = new sqlite3.Database(dbFilePath);

    deleteCatTable(db);
    createCatTable(db);

    db.close();
};

run();

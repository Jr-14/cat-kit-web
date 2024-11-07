import sqlite3 from "sqlite3";
import fs from "node:fs";

const BASE_PATH = "./db";

const createCatTable = (db) => {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS Cats (
    id INTEGER NOT NULL PRIMARY KEY
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
    const db = new sqlite3.Database("testDb.sqlite");

    createCatTable(db);

    db.close();
};

run();

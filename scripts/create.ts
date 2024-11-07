import sqlite3 from "sqlite3";
import fs from "node:fs";
import { createCatFixture } from "tests/fixtures/CatFixture";
import { Cat } from "~/schemas/catSchema";

const BASE_PATH = "./db";
const FILE_NAME = "testDb.sqlite";
const dbFilePath = `${BASE_PATH}/${FILE_NAME}`;

const createCatTable = (db: sqlite3.Database) => {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS Cats (
    id INTEGER NOT NULL PRIMARY KEY
    , microchip TEXT
    , name TEXT NOT NULL
    , description TEXT
    , dateOfBirth TEXT
    , sex TEXT NOT NULL
    , breed TEXT
    , image BLOB
);`;

    db.run(createTableQuery);
};

const deleteCatTable = (db: sqlite3.Database) => {
    const deleteTableQuery = `DROP TABLE IF EXISTS Cats;`;

    db.run(deleteTableQuery);
};

const insertCatTable = (db: sqlite3.Database) => {
    const cat = createCatFixture(
        { name: 'Maya' },
        { description: 'Funny girl', sex: 'Female', breed: 'Calico'}
    );
    const imagePath = "./maya.jpg";
    const buffer = fs.readFileSync(imagePath);
    const stmt = db.prepare(
        "INSERT INTO Cats VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (error) => {
            if (error) console.log(error);
        }
    );
    stmt.run([1, cat.microchip, cat.name, cat.description, cat.dateOfBirth, cat.sex, cat.breed, buffer]);
    stmt.finalize();
};

const printCatTable = (db: sqlite3.Database) => {
    const sql = `SELECT * FROM Cats WHERE Cats.'name' = ?;`;
    db.get<Cat>(sql, "Maya", (error, row) => {
        if (error) throw error;
        console.log(row);
    })
}

const run = async () => {
    const db = new sqlite3.Database(dbFilePath);

    db.serialize(() => {
        deleteCatTable(db);
        createCatTable(db);
        insertCatTable(db);
        printCatTable(db);
    });

    db.close();
};

run();

import sqlite3 from "sqlite3";
import fs from "node:fs";

const BASE_PATH = "./db";

const run = async () => {
    const dbFileName = "testDb.sqlite";
    if (!fs.existsSync(`${BASE_PATH}/${dbFileName}`)) {

    }
    const db = new sqlite3.Database("testDb.sqlite");

    db.serialize(() => {
        db.run("CREATE TABLE lorem (info TEXT)")

        const stmt = db.prepare("INSERT INTO lorem VALUES(?)");
        for (let i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
            console.log(row.id + ": " + row.info)
        });
    });

    db.close();
};

run();
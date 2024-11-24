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
    , weight NUMBER
    , image BLOB
);`;

  db.run(createTableQuery);
};

const deleteCatTable = (db: sqlite3.Database) => {
  const deleteTableQuery = `DROP TABLE IF EXISTS Cats;`;

  db.run(deleteTableQuery);
};

const insertCatTable = (
  db: sqlite3.Database,
  cat: Omit<Cat, "image" | "id">
) => {
  const imagePath = `./images/${cat.name.toLowerCase()}.jpg`;
  const buffer = fs.readFileSync(imagePath);
  const stmt = db.prepare(
    "INSERT INTO Cats (microchip, name, description, dateOfBirth, sex, breed, weight, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    (error) => {
      if (error) console.log(error);
    },
  );
  stmt.run([
    cat.microchip,
    cat.name,
    cat.description,
    cat.dateOfBirth,
    cat.sex,
    cat.breed,
    cat.weight,
    buffer,
  ]);
  stmt.finalize();
};

const printCatTable = (db: sqlite3.Database) => {
  const sql = `SELECT * FROM Cats;`;
  db.all<Cat>(sql, (error, rows) => {
    if (error) throw error;
    console.log(rows);
  });
};

const run = async () => {
  const db = new sqlite3.Database(dbFilePath);

  const cats = [
    createCatFixture(
      { name: "Maya" },
      { description: "Funny girl", sex: "Female", breed: "Calico" },
    ),
    createCatFixture(
      { name: "Bruce" },
      { description: "Chonky boy", sex: "Male", breed: "Tuxedo" },
    ),
    createCatFixture(
      { name: "Bennie" },
      {
        description: "Wants to eat your food",
        sex: "Male",
        breed: "Black and white",
      },
    ),
    createCatFixture(
      { name: "Bumble" },
      {
        description: "Shy boy",
        sex: "Male",
        breed: "Tuxedo",
      },
    ),
    createCatFixture(
      { name: "Ollie" },
      {
        description: "Gentle ginger",
        sex: "Male",
        breed: "Ginger",
      },
    ),
    createCatFixture(
      { name: "Mishka" },
      {
        description: "Playful Senior Bengal",
        sex: "Female",
        breed: "Bengal",
      },
    ),
  ];

  db.serialize(() => {
    deleteCatTable(db);
    createCatTable(db);
    cats.forEach((cat) => insertCatTable(db, cat));
    printCatTable(db);
  });

  db.close();
};

run();

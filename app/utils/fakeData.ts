import sqlite3 from "sqlite3"
import { Cat } from "~/schemas/catSchema";

const retrieve = async (db: sqlite3.Database): Promise<Cat> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Cats WHERE Cats.'name' = ?;`;
    db.get<Cat>(sql, "Maya", (error, row) => {
      if (error) reject(error);
      const imageBase64 = row.image ? Buffer.from(row.image).toString("base64") : null;
      resolve({
        ...row,
        image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : null
      });
    });
  });
}

export const getData = async (): Promise<Cat> => {
  const db = new sqlite3.Database('./db/testDb.sqlite');
  const data = await retrieve(db);
  db.close();
  return data;
}

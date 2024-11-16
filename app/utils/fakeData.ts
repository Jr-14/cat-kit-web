import sqlite3 from "sqlite3";
import { Cat } from "~/schemas/catSchema";

const db = new sqlite3.Database("./db/testDb.sqlite");

type CatDetails = Pick<Cat, "id" | "name" | "image">;

export const getCatsDetails = async (): Promise<CatDetails[]> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name, image FROM Cats;`;
    db.all<Cat>(sql, (error, rows) => {
      if (error) reject(error);
      const catDetails = rows.map((row) => {
        const imageBase64 = row.image
          ? Buffer.from(row.image).toString("base64")
          : null;
        return {
          ...row,
          image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : null,
        };
      });
      resolve(catDetails);
    });
  });
};

export const getData = async (): Promise<Cat[]> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Cats;`;
    db.all<Cat>(sql, (error, rows) => {
      if (error) reject(error);
      const cats = rows.map((row) => {
        const imageBase64 = row.image
          ? Buffer.from(row.image).toString("base64")
          : null;
        return {
          ...row,
          image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : null,
        };
      });
      resolve(cats);
    });
  });
  // const data = await retrieve(db);
  // db.close();
  // return data;
};

export const getCatById = async (id: string): Promise<Cat> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Cats WHERE Cats."id" = ?;`;
    db.get<Cat>(sql, id, (error, row) => {
      if (error) reject(error);
      const imageBase64 = row.image
        ? Buffer.from(row.image).toString("base64")
        : null;
      resolve({
        ...row,
        image: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : null,
      });
    });
  });
};

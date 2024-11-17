import sqlite3 from "sqlite3";
import type { Cat } from "~/schemas/catSchema";

const db = new sqlite3.Database("./db/testDb.sqlite");

type CatDetails = Pick<Cat, "id" | "name" | "image">;

const CATS_TABLE = "Cats";

const prepareUpdateState = (update: Partial<Cat>): [string, object] => {
  const updateEntries = Object.entries(update);

  const statement = updateEntries
    .reduce<string[]>((acc, [key, value]) => {
      if (value) {
        acc.push(`${key} = $${key}`);
      }
      return acc;
    }, [])
    .join(",");

  const namedParameters = updateEntries.reduce((acc, [key, value]) => {
    return {
      ...acc,
      [`$${key}`]: value,
    };
  }, {});

  return [statement, namedParameters];
};

export const getCatsDetails = async (): Promise<CatDetails[]> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name, image FROM ${CATS_TABLE};`;

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

export const updateCatById = async (
  catId: string,
  updates: Partial<Cat>,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const [updateColumns, updateObject] = prepareUpdateState(updates);

    const sql = `UPDATE ${CATS_TABLE}
SET ${updateColumns}
WHERE id = ${catId};`;

    db.run(sql, updateObject, (error) => {
      if (error) {
        reject(error);
      }
    });

    resolve();
  });
};

export const getAllCats = async (): Promise<Cat[]> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${CATS_TABLE};`;
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

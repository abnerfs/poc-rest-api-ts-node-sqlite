import sqlite3 from 'sqlite3';
const { DATABASE_FILE }  = process.env;
if(!DATABASE_FILE)
    throw new Error("DATABASE_FILE não informado");

export const dbQuery = (query: string, payload?: Array<any>) => {
    const db = openConnection();
    const rows = new Promise<any[]>((resolve, reject) => {
        db.all(query, payload, (err, rows) => {
            if(err)
                return reject(err);

            return resolve(rows);
        }) 
    })
    .finally(() => {
        db.close();
    })
    return rows;
}

export const openConnection = () => {
    const db = new sqlite3.Database(DATABASE_FILE);
    return db;
}
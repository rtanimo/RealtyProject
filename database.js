import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getAllProperty() {
    const [rows] = await pool.query(`
        SELECT *
        FROM Property;
    `);

    return rows;
}

const result = await getAllProperty();
console.log(result);
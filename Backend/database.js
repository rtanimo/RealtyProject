import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE,
  }).promise()

// query property table, returns all properties
export async function getAllProperties() {
  const [records, fields] = await pool.query('SELECT * FROM Property')

  return records
}

// query all sales records
export async function getAllSalesRecords() {
  const [records, fields] = await pool.query('SELECT * FROM Sale_Record')

  return records
}

// query all assessments
export async function getAllAssessments() {
  const [records, fields] = await pool.query('SELECT * FROM Assessment')

  return records
}

// query assessments for a property, returns all assesssements for that property
export async function getAssessments(TMK) {
  const [records, fields] = await pool.query('SELECT * FROM Assessment WHERE TMK = ?', [TMK])

  return records
}

// const res = await getAllProperties();
// console.log(res);


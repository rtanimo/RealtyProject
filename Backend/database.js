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

// get sale records for a single property
export async function getSaleRecords(TMK) {
  const [records] = await pool.query(`
    SELECT *
    FROM Sale_Record
    WHERE TMK=?
    ORDER BY Year DESC
  `, [TMK])

  return records
}

// query all assessments
export async function getAllAssessments() {
  const [records, fields] = await pool.query('SELECT * FROM Assessment')

  return records
}

// query all realtors
export async function getAllRealtors() {
  const [records, fields] = await pool.query('SELECT * FROM Realtor')

  return records
}

// query assessments for a property, returns all assesssements for that property
export async function getAssessments(TMK) {
  const [records, fields] = await pool.query('SELECT * FROM Assessment WHERE TMK = ? ORDER BY Year DESC', [TMK])

  return records
}

export async function getTaxRecords(TMK) {
  const [records] = await pool.query('SELECT * FROM Tax_Record WHERE TMK = ? ORDER BY Year DESC', [TMK])

  return records
}

export async function getNearbySchools(district_zone) {
  const [records] = await pool.query('SELECT * FROM School WHERE district_zone = ?', [district_zone])

  return records
}

export async function getDistrictName(district_zone) {
  const [records] = await pool.query('SELECT Zone_Name FROM District_Zone WHERE Zone_Num = ?', [district_zone])

  return records
}

export async function getMinMaxPrice() {
  const [records] = await pool.query(`SELECT MIN(asking_price) AS min_price, MAX(asking_price) AS max_price FROM property;
  `)

  return records
}


// query all tables for search side bar
export async function searchBar(propertyType) {

  let select = `SELECT p.*`
  let from =  `FROM property p`
  let join = ``
  let where = ` WHERE 1=1`

  if (propertyType === "all") {
    join += ` LEFT JOIN House h ON p.TMK=h.TMK 
              LEFT JOIN Condo c ON p.TMK=c.TMK 
              LEFT JOIN Empty_Lot e ON p.TMK=e.TMK`
  }

  if (propertyType === "house") {
    select += `, h.*`
    join += ` INNER JOIN House h ON p.TMK=h.TMK`
  }

  if (propertyType === "condo") {
    select += `, c.*`
    join += ` INNER JOIN Condo c ON p.TMK=c.TMK`
  }

  if (propertyType === "empty_lot") {
    select += `, e.*`
    join += ` INNER JOIN Empty_Lot e ON p.TMK=e.TMK`
  }

  // if (minPrice || maxPrice) {
  //   where += ` AND (p.asking_price >= minPrice OR p.asking_price <= maxPrice)`
  // }

  let queryString = select + from + join + where

  const [records] = await pool.query(queryString)

  return records
  
}

// let [{min_price, max_price}] = await getMinMaxPrice()
// // let [min, max] = records
// // console.log(records.min_price)
// // console.log(max)
// console.log(min_price)
// console.log(max_price)

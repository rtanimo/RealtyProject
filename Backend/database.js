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
    join += ` LEFT JOIN House h ON p.TMK=h.TMK`
  }

  if (propertyType === "condo") {
    select += `, c.*`
    join += ` LEFT JOIN Condo c ON p.TMK=c.TMK`
  }

  if (propertyType === "empty_lot") {
    select += `, e.*`
    join += ` LEFT JOIN Empty_Lot e ON p.TMK=e.TMK`
  }

  // if (minPrice || maxPrice) {
  //   where += ` AND (p.asking_price >= ${minPrice} AND p.asking_price <= ${maxPrice})`
  // }

  let queryString = select + from + join + where

  const [records] = await pool.query(queryString)

  return records
  
}

export async function queryDatabase(propertyType, minPrice, maxPrice, numBed, numBath, districtNum, lavaZone) {

    // Construct the basic SQL query to select all properties and join on the appropriate table
    let queryString = `
    SELECT p.*
    FROM property AS p 
  `;

  if (propertyType === 'house') {
    queryString += 'LEFT JOIN house AS h ON p.TMK = h.TMK ';
  } else if (propertyType === 'condo') {
    queryString += 'LEFT JOIN condo AS c ON p.TMK = c.TMK ';
  } else if (propertyType === 'empty_lot') {
    queryString += 'LEFT JOIN empty_lot AS e ON p.TMK = e.TMK ';
  } else {
    // if propertyType is not specified or is "all", join all tables
    queryString += 'LEFT JOIN house AS h ON p.TMK = h.TMK '
    queryString += 'LEFT JOIN condo AS c ON p.TMK = c.TMK '
    queryString += 'LEFT JOIN empty_lot AS e ON p.TMK = e.TMK ';
  }

  // Add conditions to the WHERE clause based on the user's search criteria
  queryString += `
    WHERE p.asking_price >= ${minPrice} AND p.asking_price <= ${maxPrice}
  `;

  if (districtNum != "Any" && districtNum > 0) {
    queryString += `
      AND p.district_num = ${districtNum}
    `
  }

  if (lavaZone) {
    queryString += `
      AND p.lava_zone = ${lavaZone}
    `
  }

  if (numBed && numBed != 0) {
    if (propertyType === "house") {
      queryString += ` AND h.num_bedroom = ${numBed}`;
    } else if (propertyType === "condo") {
      queryString += ` AND c.num_bedroom = ${numBed}`;
    } else {
      queryString += ` AND (h.num_bedroom = ${numBed} OR c.num_bedroom  = ${numBed})`
    }
  }
    
  if (numBath != "Any" && numBath != 0) {
    if (propertyType === "house") {
      queryString += ` AND h.num_bathroom = ${numBath}`;
    } else if (propertyType === "condo") {
      queryString += ` AND c.num_bathroom = ${numBath}`;
    } else {
      queryString += ` AND (h.num_bathroom = ${numBath} OR c.num_bathroom  = ${numBath})`
    }
  }


  // const queryString = `
  //   SELECT p.*, h.num_bedroom, h.num_bathroom, h.square_footage, h.acreage, c.num_bedroom, c.num_bathroom, c.square_footage, c.apt_num, el.acreage
  //   FROM property AS p
  //   LEFT JOIN empty_lot AS el ON p.tmk = el.tmk
  //   LEFT JOIN condo AS c ON p.tmk = c.tmk
  //   LEFT JOIN house AS h ON p.tmk = h.tmk
  //   WHERE
  //   ${numBed ? `AND (c.num_bedroom = ${numBed} OR h.num_bedroom = ${numBed})` : ''}
  //   ${numBath ? `AND (c.num_bathroom = ${numBath} OR h.num_bathroom = ${numBath})` : ''}
  // `;

  const [records] = await pool.query(queryString)
  console.log("Query STring: " + queryString)

  return records
}

// let [{min_price, max_price}] = await getMinMaxPrice()
// // let [min, max] = records
// // console.log(records.min_price)
// // console.log(max)
// console.log(min_price)
// console.log(max_price)

// let res = await queryDatabase("house", 0, 369000, 2, 2, 1, 3)
// console.log(res)

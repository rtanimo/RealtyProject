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

export async function getRealtorName(realtorId) {
  const [records] = await pool.query(`SELECT * FROM Realtor WHERE Agent_Num = ?`, [realtorId])

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
  let selectString = `
    SELECT DISTINCT p.*
  `;
  let fromString = ` FROM property AS p `
  let joinString = ``

  if (propertyType === 'house') {
    selectString += `, h.num_bedroom as houseBed, h.num_bathroom as houseBath `
    joinString += 'LEFT JOIN house AS h ON p.TMK = h.TMK ';
  } else if (propertyType === 'condo') {
    selectString += `, c.num_bathroom as condoBath, c.num_bedroom as condoBed `
    joinString += 'LEFT JOIN condo AS c ON p.TMK = c.TMK ';
  } else if (propertyType === 'empty_lot') {
    selectString += `, el.acreage as elAcreage `
    joinString += 'LEFT JOIN empty_lot AS el ON p.TMK = el.TMK ';
  } else {
    // if propertyType is not specified or is "all", join all tables
    selectString += `, h.num_bedroom as houseBed, h.num_bathroom as houseBath, c.num_bedroom as condoBed, c.num_bathroom as condoBath, el.acreage as elAcreage `
    joinString += 'LEFT JOIN house AS h ON p.TMK = h.TMK '
    joinString += 'LEFT JOIN condo AS c ON p.TMK = c.TMK '
    joinString += 'LEFT JOIN empty_lot AS el ON p.TMK = el.TMK ';
  }

  // Add conditions to the WHERE clause based on the user's search criteria
  let whereString = `
    WHERE p.asking_price >= ${minPrice} AND p.asking_price <= ${maxPrice}
  `;

  if (districtNum !== "Any" && districtNum > 0) {
    whereString += `
      AND p.district_num = ${districtNum}
    `
  }

  if (lavaZone !== 0 && lavaZone !== "Any") {
    whereString += `
      AND p.lava_zone = ${lavaZone}
    `
  }

  if (numBed !== "Any" && numBed !== 0 && propertyType !== "empty_lot") {
    if (propertyType === "house") {
      whereString += ` AND h.num_bedroom = ${numBed} `;
    } else if (propertyType === "condo") {
      whereString += ` AND c.num_bedroom = ${numBed} `;
    } else {
      whereString += ` AND (h.num_bedroom = ${numBed} OR c.num_bedroom  = ${numBed}) `
    }
  }
    
  if (numBath !== "Any" && numBath !== 0 && propertyType !== "empty_lot") {
    if (propertyType === "house") {
      whereString += ` AND h.num_bathroom = ${numBath} `;
    } else if (propertyType === "condo") {
      whereString += ` AND c.num_bathroom = ${numBath} `;
    } else {
      whereString += ` AND (h.num_bathroom = ${numBath} OR c.num_bathroom  = ${numBath}) `
    }
  }

  let queryString = selectString + fromString + joinString + whereString

  const [records] = await pool.query(queryString)
  console.log("Query STring: " + queryString)

  return records
}

export async function insertIntoProperty(TMK, asking_price, hoa_fee, lava_zone, district_zone, street_num, street_name, city, state, zipcode, realtor_id) {
  let insertStatement = `INSERT INTO Property(TMK, Asking_Price, Lava_Zone, HOA_Fees, Zipcode, City, State, Street_Num, Street_Name, Realtor_ID, District_Num)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  pool.query(insertStatement, [TMK, asking_price, lava_zone, hoa_fee, zipcode, city, state, street_num, street_name, realtor_id, district_zone])
}

export async function insertIntoHouse(TMK, num_bedrooms, num_bathrooms, acreage, square_footage) {
  let insertStatement = `INSERT INTO House(TMK,Num_Bedroom,Num_Bathroom,Acreage,Square_Footage)
  VALUES (${TMK}, ${num_bedrooms}, ${num_bathrooms}, ${acreage}, ${square_footage})`

  pool.query(insertStatement)
}

export async function insertIntoCondo(TMK, num_bedrooms, num_bathrooms, square_footage, apt_num) {
  let inserStatement = `INSERT INTO Condo(TMK,Num_Bedroom,Num_Bathroom,Square_Footage, Apt_Num)
  VALUES (${TMK}, ${num_bedrooms}, ${num_bathrooms}, ${square_footage}, ${apt_num})`

  pool.query(inserStatement)
}

export async function insertIntoEmptyLot(TMK, acreage) {
  let inserStatement = `INSERT INTO Empty_Lot(TMK,Acreage)
  VALUES (${TMK}, ${acreage})`

  pool.query(inserStatement)

}


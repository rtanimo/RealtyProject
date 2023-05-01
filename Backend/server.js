import express from 'express'
import {getAllProperties, 
        getAllAssessments, 
        getAllSalesRecords, getAssessments, 
        getAllRealtors,
        searchBar,
        getSaleRecords,
        getTaxRecords,
        getNearbySchools,
        getDistrictName,
        getMinMaxPrice,
        queryDatabase,
        getRealtorName,
        insertIntoProperty,
        insertIntoHouse,
        insertIntoCondo,
        insertIntoEmptyLot
        } from './database.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/api/property', async (req, res) => {
    const properties = await getAllProperties()
    res.send(properties)
})

app.get('/api/price/min/max', async (req, res) => {
    const records = await getMinMaxPrice()
    res.send(records)
})

app.get('/api/sales-records', async (req, res) => {
    const sales = await getAllSalesRecords()
    res.send(sales)
})


app.get('/api/assessments', async (req, res) => {
    const assessments = await getAllAssessments()
    res.send(assessments)
})

app.get('/api/realtors', async (req, res) => {
    const realtors = await getAllRealtors()
    res.send(realtors)
})

app.post('/api/search', async (req, res) => {
    const propertyType = req.body.propertyType
    const records = await searchBar(propertyType)
    res.send(records)
})

app.post('/api/search/querydatabase', async (req, res) => {
    const propertyType = req.body.propertyType
    const minPrice = req.body.minPrice
    const maxPrice = req.body.maxPrice
    const numBed = req.body.numBed
    const numBath = req.body.numBath
    const districtNum = req.body.districtNum
    const lavaZone = req.body.lavaZone

    // console.log( propertyType, minPrice, maxPrice, numBed, numBath, districtNum, lavaZone)
    const records = await queryDatabase(propertyType, minPrice, maxPrice, numBed, numBath, districtNum, lavaZone)

    
    res.send(records)
    console.log(records)
})

app.post('/api/search/sale-records', async (req, res)=> {
    const tmk = req.body.taxMapKey
    const records = await getAllSalesRecords(tmk)
    res.send(records)
})

app.post('/api/search/assessments', async (req, res) => {
    const tmk = req.body.taxMapKey
    const records = await getAssessments(tmk)
    res.send(records)
})

app.post("/api/search/tax-records", async (req, res) => {
    const tmk = req.body.taxMapKey
    const records = await getTaxRecords(tmk)
    res.send(records)
})

app.post("/api/search/nearby-schools", async (req, res) => {
    const district_zone = req.body.districtNum
    const records = await getNearbySchools(district_zone)
    res.send(records)
})

app.post("/api/search/district-name", async (req, res) => {
    const district_zone = req.body.districtNum
    const records = await getDistrictName(district_zone)
    res.send(records)
})

app.post("/api/sell", async (req, res) => {
    let realtor_id = req.body.realtorID
    let TMK = req.body.TMK
    let asking_price = req.body.askingPrice
    let hoa_fee = req.body.HOA
    let lava_zone = req.body.lavaZone
    let district_zone = req.body.districtZone
    let street_num = req.body.streetNumber
    let street_name = String(req.body.streetName)
    let city = req.body.city
    let state = req.body.state
    let zipcode = req.body.zip
    let propertyType = req.body.propertyType
    let num_bedrooms = req.body.bedrooms
    let num_bathrooms = req.body.bathrooms
    let acreage = req.body.acreage
    let square_footage = req.body.sqFootage
    let apt_num = req.body.aptNum
    console.log(realtor_id, TMK, asking_price, hoa_fee, lava_zone, district_zone, street_num, street_name, city, state, zipcode, propertyType, num_bedrooms, num_bathrooms, acreage, square_footage, apt_num)

    if (propertyType === "house") {
        insertIntoHouse(TMK, num_bedrooms, num_bathrooms, acreage, square_footage)
        insertIntoProperty(TMK, asking_price, hoa_fee, lava_zone, district_zone, street_num, street_name, city, state, zipcode, realtor_id)
    }

    if (propertyType === "condo") {
        insertIntoCondo(TMK, num_bedrooms, num_bathrooms, square_footage, apt_num)
        insertIntoProperty(TMK, asking_price, hoa_fee, lava_zone, district_zone, street_num, street_name, city, state, zipcode, realtor_id)
    }

    if (propertyType === "empty_lot") {
        insertIntoEmptyLot(TMK, acreage)
        insertIntoProperty(TMK, asking_price, hoa_fee, lava_zone, district_zone, street_num, street_name, city, state, zipcode, realtor_id)
    }

    

    res.send("completed")


})

app.listen(3001, () => {
    console.log("Server listening on port 3001")
})
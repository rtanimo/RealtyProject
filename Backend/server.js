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
        getMinMaxPrice
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
    const minPrice = req.body.minPrice
    console.log(minPrice)
    const maxPrice = req.body.maxPrice
    console.log(maxPrice)
    const records = await searchBar(propertyType, minPrice, maxPrice)
    res.send(records)
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

app.listen(3001, () => {
    console.log("Server listening on port 3001")
})
import express from 'express'
import {getAllProperties, getAllAssessments, getAllSalesRecords, getAssessments, getAllRealtors} from './database.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/api/property', async (req, res) => {
    const properties = await getAllProperties()
    res.send(properties)
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

// app.get('/api/assessments', async (req, res) => {
//     const assessments = await getAssessments(264950)
//     res.send(assessments)
// })



app.listen(3001, () => {
    console.log("Server listening on port 3001")
})
import express from 'express'
import {getAllProperties, getAllAssessments} from './database.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/api/property', async (req, res) => {
    const properties = await getAllProperties()
    res.send(properties)
})

app.get('/assessment', async (req, res) => {
    const assessments = await getAllAssessments(264950)
    res.send(assessments)
})



app.listen(3001, () => {
    console.log("Server listening on port 3001")
})
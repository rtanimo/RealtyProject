import {React, useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Assessment from '../components/Assessment'

export default function Assessments() {
    const [assessments, setAssessments] = useState([])

    useEffect( () => {
        axios.get('/api/assessments').then( (response) => {
            setAssessments(response.data)
        })
    }, [])

  return (
    <div>
        {assessments.map( (item) => (
            <Assessment 
                key={item.Report_Num}
                tmk={item.TMK}
                year={item.Year}
                assessed_value={item.Assessed_Value}
                market_value={item.Market_Value}
                estimated_property_tax={item.Estimated_Property_Tax}
            />
        ))}
    </div>
  )
}

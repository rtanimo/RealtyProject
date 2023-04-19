import {React, useState, useEffect} from 'react'
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
        <div className="container">
        <h1 className='text-center pb-4'>Assessments For All Properties</h1>
            <div className="row">
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
        </div>
    </div>
  )
}

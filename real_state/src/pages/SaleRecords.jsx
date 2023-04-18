import {React, useState, useEffect} from 'react'
import axios from 'axios'
import SaleRecord from '../components/SaleRecord'
import Navbar from '../components/Navbar'

export default function SaleRecords() {
    const [saleRecords, setSaleRecords] = useState([])

    useEffect( () => {
        axios.get("/api/sales-records").then( (response) => {
            setSaleRecords(response.data)
        })
    }, [])

  return (
    <div>
        <Navbar />
        {saleRecords.map( (item) => (
            <SaleRecord 
                key={item.Transaction_ID}
                tmk={item.TMK}
                year={item.Year}
                sale_price={item.Sale_Price}
            />
        ))}
    </div>
  )
}

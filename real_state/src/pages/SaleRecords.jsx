import {React, useState, useEffect} from 'react'
import axios from 'axios'
import SaleRecord from '../components/SaleRecord'

export default function SaleRecords() {
    const [saleRecords, setSaleRecords] = useState([])

    useEffect( () => {
        axios.get("/api/sales-records").then( (response) => {
            setSaleRecords(response.data)
        })
    }, [])

  return (
    
    <div className='container'>
        <h1 className='text-center pb-4'>Sale Records For All Properties</h1>
        <div className="col">
            <div className="row">
                {saleRecords.map( (item) => (
                    <SaleRecord 
                        key={item.Transaction_ID}
                        tmk={item.TMK}
                        year={item.Year}
                        sale_price={item.Sale_Price}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

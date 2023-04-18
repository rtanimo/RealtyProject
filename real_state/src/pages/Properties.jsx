import {React, useState, useEffect} from 'react'
import axios from 'axios'
import Property from '../components/Property'
import Navbar from '../components/Navbar'


export default function Properties(props) {
    const [listOfProperties, setListOfProperties] = useState([])

    useEffect( () => {
        axios.get("/api/property").then( (response) => {
            setListOfProperties(response.data)
        })
    }, [])
    if (!listOfProperties) return null;

    return(
    <div>
        <div className="container">
            <div className="row">
        {listOfProperties.map( (item) => (
            <Property 
                key={item.TMK}
                street_num={item.Street_Num}
                street_name={item.Street_Name}
                city={item.City}
                state={item.State}
                zipcode={item.Zipcode}
                asking_price={item.Asking_Price}
                lava_zone={item.Lava_Zone}
                district_zone={item.District_Num}
                realtor_id={item.Realtor_ID}
                hoa_fee={item.HOA_Fees}
            />
        ))}
            </div>
        </div>
    </div>
    )
}
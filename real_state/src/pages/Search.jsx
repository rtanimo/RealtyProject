import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Property from '../components/Property'

export default function Search(){


    const [numBedroom, setNumBedroom] = useState(0);
    const [propertyType, setPropertyType] = useState("");
    const [resultList, setResultList] = useState([]);
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    // const [numBed, setNumBed] = useState()
    // const [numBath, setNumBath] = useState()

    useEffect( () => {
        getMinMaxPrice()
        queryDB(propertyType)
    },[])

    function handleSelectChange(event) {
        setNumBedroom(event.target.value)
    }

    function handleMinPriceChange(event) {
        setMinPrice(event.target.value)
    }

    function handleMaxPriceChange(event) {
        setMaxPrice(event.target.value)
    }
    function handlePropertySelect(event) {
        setPropertyType(event.target.value)
        queryDB(event.target.value)     
    }

    function getMinMaxPrice() {
        axios.get("/api/price/min/max")
        .then((response) => {
            let [{min_price, max_price}] = response.data
            setMinPrice(min_price)
            setMaxPrice(max_price)
        })
    }

    function queryDB(propertyType) {
        axios.post("/api/search", {
            propertyType: propertyType 
        }).then((response) => {
            setResultList(response.data)
            console.log(response.data)
        })

    }

    return (
        <div className='container'>
            <div className="row">
                <div className='col-3' >

                    <Form>
                        <Form.Group className='pt-2 pb-4'>
                            <Form.Label>
                                <strong>Property Type</strong>
                            </Form.Label>
                            <Form.Select onChange={handlePropertySelect} value={propertyType}>
                                <option value="all">All</option>
                                <option value="house">House</option>
                                <option value="condo">Condominium</option>
                                <option value="empty_lot">Empty Lot</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <strong>Price</strong>
                            <br />
                            <Form.Label>
                                Min
                            </Form.Label>
                            <Form.Control onChange={handleMinPriceChange} value={minPrice} />
                            <Form.Label>
                                Max
                            </Form.Label>
                            <Form.Control onChange={handleMaxPriceChange} value={maxPrice} />
                            
                        </Form.Group>

                        <Form.Group className='pt-4 pb-4'>
                            <Form.Label>
                                <strong>Bedrooms</strong>
                            </Form.Label>
                            <Form.Select onChange={handleSelectChange} value={numBedroom}>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='pb-4'>
                            <Form.Label>
                                <strong>Bathrooms</strong>
                            </Form.Label>
                            <Form.Select>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='pb-4'>
                            <Form.Label>
                                <strong>District</strong>
                            </Form.Label>
                            <Form.Select>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                                <option value="">6</option>
                                <option value="">7</option>
                                <option value="">8</option>
                                <option value="">9</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='pb-4'>
                            <Form.Label>
                                <strong>Lava Zone</strong>
                            </Form.Label>
                            <Form.Select>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                                <option value="">6</option>
                                <option value="">7</option>
                                <option value="">8</option>
                                <option value="">9</option>
                            </Form.Select>
                        </Form.Group>                       
                        
                    </Form>
                </div>

                <div className="col-9">
                    <div className="row">
                        {resultList.map( (item) => (
                            <Property 
                                tmk={item.TMK}
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
                                num_bed={item.Num_Bedroom}
                                num_bath={item.Num_Bathroom}
                                acres={item.Acreage}
                                sq_ft={item.Square_Footage}
                                d_num={item.District_Num}
                            />
                        ))}
                    </div>
                </div>
                     
            </div>
            
        </div>
    )
}
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Property from '../components/Property'
import Button from 'react-bootstrap/Button';

export default function Search(){

    const [propertyType, setPropertyType] = useState("all");
    const [resultList, setResultList] = useState([]);
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [numBed, setNumBed] = useState(0)
    const [numBath, setNumBath] = useState(0)
    const [districtNum, setDistrictNum] = useState(0)
    const [lavaZone, setLavaZone] = useState(0)

    useEffect( () => {
        axios.get("/api/price/min/max")
        .then((response) => {
            setMinPrice(response.data[0].min_price)
            setMaxPrice(response.data[0].max_price)
        })
        queryDB(propertyType)
        
    },[])

    function handleOnSubmit(event) {
        event.preventDefault()
        const postData = {propertyType, minPrice, maxPrice, numBed, numBath, districtNum, lavaZone}
        axios.post("/api/search/querydatabase", {
            propertyType: propertyType,
            minPrice: minPrice,
            maxPrice: maxPrice,
            numBed: numBed,
            numBath: numBath,
            districtNum: districtNum,
            lavaZone: lavaZone
        }).then((response) => {
            setResultList(response.data)
            console.log(response.data)
        })
    }

    function queryDB(propertyType) {
        axios.post("/api/search", {
            propertyType: propertyType,
        }).then((response) => {
            setResultList(response.data)
        })
    }

    return (
        <div className='container'>
            <div className="row">
                <div className='col-3' >

                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className='pt-2 pb-4'>
                            <Form.Label>
                                <strong>Property Type</strong>
                            </Form.Label>
                            <Form.Select onChange={(e) => setPropertyType(e.target.value)} value={propertyType}>
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
                            <Form.Control onChange={(e) => setMinPrice(e.target.value)} value={minPrice} />
                            <Form.Label>
                                Max
                            </Form.Label>
                            <Form.Control onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice} />
                            
                        </Form.Group>

                        <Form.Group className='pt-4 pb-4'>
                            <Form.Label>
                                <strong>Bedrooms</strong>
                            </Form.Label>
                            <Form.Select onChange={(e) => setNumBed(e.target.value)} value={numBed}>
                                <option value="Any">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='pb-4'>
                            <Form.Label>
                                <strong>Bathrooms</strong>
                            </Form.Label>
                            <Form.Select onChange={(e) => setNumBath(e.target.value)} value={numBath}>
                                <option value="Any">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='pb-4'>
                            <Form.Label>
                                <strong>District</strong>
                            </Form.Label>
                            <Form.Select onChange={(e) => setDistrictNum(e.target.value)} value={districtNum}>
                                <option value="Any">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='pb-4'>
                            <Form.Label>
                                <strong>Lava Zone</strong>
                            </Form.Label>
                            <Form.Select onChange={(e) => setLavaZone(e.target.value)} value={lavaZone}>
                                <option value="Any">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant='primary' type='submit'>
                            Search
                        </Button>                    
                        
                    </Form>
                </div>

                

                <div className="col-9">
                {resultList.length !== 0 ? 
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
                                houseBed={item.houseBed}
                                houseBath={item.houseBath}
                                condoBath={item.condoBath}
                                condoBed={item.condoBed}
                                acres={item.Acreage}
                                sq_ft={item.Square_Footage}
                                d_num={item.District_Num}
                            /> 
                        ))}
                    </div> 
                    : 
                    <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                      <h1 className="display-4">No Results</h1>
                      <p className="lead">Please try your search again or contact Ethan Sick.</p>
                    </div>
                  </div>}
                </div> 

                     
            </div>
            
        </div>
    )
}
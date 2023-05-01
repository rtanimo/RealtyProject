import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'

export default function SellProperty() {

    const [realtorID, setRealtorID] = useState()
    const [TMK, setTMK] = useState()
    const [askingPrice, setAskingPrice] = useState()
    const [HOA, setHOA] = useState()
    const [lavaZone, setLavaZone] = useState()
    const [districtZone, setDistrictZone] = useState()
    const [streetNumber, setStreetNumber] = useState()
    const [streetName, setStreetName] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState()
    const [propertyType, setPropertyType] = useState("")
    const [bedrooms, setBedrooms] = useState()
    const [bathrooms, setBathrooms] = useState()
    const [acreage, setAcreage] = useState()
    const [sqFootage, setSqFootage] = useState()
    const [aptNum, setAptNum] = useState()

    function handleOnSubmit(event) {
        axios.post("/api/sell", {
            realtorID: realtorID,
            TMK: TMK,
            askingPrice: askingPrice,
            HOA: HOA,
            lavaZone: lavaZone,
            districtZone: districtZone,
            streetNumber: streetNumber,
            streetName: streetName,
            city: city,
            state: state,
            zip: zip,
            propertyType: propertyType,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            acreage: acreage,
            sqFootage: sqFootage,
            aptNum: aptNum
        }).then((response) => {
            console.log(response)
        })
    }


    return(
        <Container>
            <h1>Enter Property Details</h1>
            <Form onSubmit={handleOnSubmit}>
                <Row className='mb-3'>
                <Form.Group as={Col} md='1'>
                <Form.Label>Realtor ID</Form.Label>
                <Form.Control type="number" onChange={(e) => setRealtorID(e.target.value)} value={realtorID} />
                </Form.Group>

                <Form.Group as={Col} md='2'>
                <Form.Label>TMK</Form.Label>
                <Form.Control type="number" onChange={(e) => setTMK(e.target.value)} value={TMK} />
                </Form.Group>

                <Form.Group as={Col} md='2'>
                <Form.Label>Asking Price</Form.Label>
                <Form.Control type="number" onChange={(e) => setAskingPrice(e.target.value)} 
                value={askingPrice} />
                </Form.Group>

                <Form.Group as={Col} md='2'>
                <Form.Label>HOA Fees</Form.Label>
                <Form.Control type="number" onChange={(e) => setHOA(e.target.value)} value={HOA} />
                </Form.Group>

                <Form.Group as={Col} md='2'>
                <Form.Label>Lava Zone</Form.Label>
                <Form.Control type="number" onChange={(e) => setLavaZone(e.target.value)} value={lavaZone} />
                </Form.Group>

                <Form.Group as={Col} md='2'>
                <Form.Label>District Number</Form.Label>
                <Form.Control type="number" onChange={(e) => setDistrictZone(e.target.value)} 
                value={districtZone} />
                </Form.Group>
                </Row>

                <Row className='mb-3'>
                <Form.Group as={Col} md="3">
                <Form.Label>Street Number</Form.Label>
                <Form.Control type="text" onChange={(e) => setStreetNumber(e.target.value)} value={streetNumber} />
                </Form.Group>

                <Form.Group as={Col} md="8">
                <Form.Label>Street Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setStreetName(e.target.value)} value={streetName}/>
                </Form.Group>
                </Row>

                <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" required onChange={(e) => setCity(e.target.value)} value={city} />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="1" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" required onChange={(e) => setState(e.target.value)} value={state}/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="validationCustom05">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="text" required onChange={(e) => setZip(e.target.value)} value={zip} />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4">
                <Form.Label>Property Type</Form.Label>
                <Form.Select onChange={(e) => setPropertyType(e.target.value)} value={propertyType}>
                <option value="choose_type">Choose Type</option>
                <option value="house">House</option>
                <option value="condo">Condominium</option>
                <option value="empty_lot">Empty Lot</option>
                </Form.Select>
                </Form.Group>
                </Row>

                {propertyType === "house" && 
                    <Row className='mb-3'>
                    <Form.Group as={Col} md="2">
                    <Form.Label>Bedrooms</Form.Label>
                    <Form.Control type="number" onChange={(e) => setBedrooms(e.target.value)} value={bedrooms}/>
                    </Form.Group>

                    <Form.Group as={Col} md="2">
                    <Form.Label>Bathrooms</Form.Label>
                    <Form.Control type="number" onChange={(e) => setBathrooms(e.target.value)} value={bathrooms}/>
                    </Form.Group>

                    <Form.Group as={Col} md="2">
                    <Form.Label>Acreage</Form.Label>
                    <Form.Control type="number" onChange={(e) => setAcreage(e.target.value)} value={acreage}/>
                    </Form.Group>

                    <Form.Group as={Col} md="2">
                    <Form.Label>Square Footage</Form.Label>
                    <Form.Control type="number" onChange={(e) => setSqFootage(e.target.value)} value={sqFootage}/>
                    </Form.Group>
                    </Row>
                }

                {propertyType === "condo" && 
                    <Row className='mb-3'>
                    <Form.Group as={Col} md="2">
                    <Form.Label>Bedrooms</Form.Label>
                    <Form.Control type="number" onChange={(e) => setBedrooms(e.target.value)} value={bedrooms}/>
                    </Form.Group>

                    <Form.Group as={Col} md="2">
                    <Form.Label>Bathrooms</Form.Label>
                    <Form.Control type="number" onChange={(e) => setBathrooms(e.target.value)} value={bathrooms}/>
                    </Form.Group>

                    <Form.Group as={Col} md="2">
                    <Form.Label>Apt Number</Form.Label>
                    <Form.Control type="number" onChange={(e) => setAptNum(e.target.value)} value={aptNum}/>
                    </Form.Group>

                    <Form.Group as={Col} md="2">
                    <Form.Label>Square Footage</Form.Label>
                    <Form.Control type="number" onChange={(e) => setSqFootage(e.target.value)} value={sqFootage}/>
                    </Form.Group>
                    </Row>
                }

                {propertyType === "empty_lot" && 
                    <Row className='mb-3'>
                    <Form.Group as={Col} md="2">
                    <Form.Label>Acreage</Form.Label>
                    <Form.Control type="number" onChange={(e) => setAcreage(e.target.value)} value={acreage}/>
                    </Form.Group>
                    </Row>
                }

                
                <Button variant="primary" type="submit">
                Submit
                </Button>

            </Form>
    </Container>
    );
}

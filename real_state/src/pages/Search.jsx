import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Properties from './Properties'

export default function Search () {

    const [price, setPrice] = useState(500000);
    const [numBedroom, setNumBedroom] = useState(0);
    const [text, setText] = useState("");


    function handleSelectChange(event) {
        setNumBedroom(event.target.value)
    }

    function handleOnChange(event) {
        setText(event.target.value)
    }

    function handlePriceChange(event) {
        setPrice(event.target.value)
    }

    return (
        <div className='container'>
            <div className="row">
                <div className='col-3 border border-secondary' >

                    <Form>
                        <Form.Group className='pt-2 pb-4'>
                            <Form.Label>
                                <strong>Property Type</strong>
                            </Form.Label>
                            <Form.Check type='checkbox' label='House' />
                            <Form.Check type='checkbox' label='Condominium' />
                            <Form.Check type='checkbox' label='Emtpy Lot' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                <strong>Price</strong>
                            </Form.Label>
                            <Form.Control onChange={handlePriceChange} value={price} />
                            <Form.Range onChange={handlePriceChange} min={150000} max={1000000} value={price} />
                            
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

                <div className="col-9 border boarder-primary">
                    Search Results (Properties) go here
                </div>
                     
            </div>
            
        </div>
    )
}
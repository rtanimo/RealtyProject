import React from 'react'
import Card from 'react-bootstrap/Card'

export default function Property2(props) {

    return (
        <div>
            <Card>
                <Card.Body>

                    <Card.Title>
                        {props.street_num} {props.street_name}
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">
                    {props.city}, {props.state} {props.zipcode}
                    </Card.Subtitle>

                    <Card.Text>
                    Asking Price: {props.asking_price}
                    </Card.Text>
            
                    <Card.Link href='#property/info' className='text-decoration-none'>
                        More Info
                    </Card.Link> 

                </Card.Body>
            </Card>
        </div>
    )
}

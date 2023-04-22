import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import PropertyOffCanvas from './PropertyOffCanvas'
import Button from 'react-bootstrap/esm/Button';
import Offcanvas from 'react-bootstrap/Offcanvas'

export default function Property(props) {
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  function handleOnClick() {
    window.alert("Show Property Info")
  }
    


  return (
    <Card style={{ width: '20rem' }}>
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
        {/* <Card.Text>
          Lava Zone: {props.lava_zone}
        </Card.Text>
        <Card.Text>
          District Zone: {props.district_zone}
        </Card.Text>
        <Card.Text>
          Realtor: {props.realtor_id}
        </Card.Text>  */}
        {/* {props.hoa_fee != null ? <Card.Text>HOA Fees: {props.hoa_fee}</Card.Text> : <Card.Text>HOA Fees: 0</Card.Text>} */}
        {/* <Card.Link href='#assessment' className='text-decoration-none' onClick={handleOnClick}>Assessments</Card.Link>
        <Card.Link href='#sale-records' className='text-decoration-none'>Sale Records</Card.Link> */}
        {/* <Card.Link href='#property/info' className='text-decoration-none' onClick={handleOnClick}>More Info
        </Card.Link>  */}
  
        <Card.Link href='#property/info' className='text-decoration-none' onClick={handleShow}>
          More Info2
        </Card.Link> 
        <Offcanvas show={show} onHide={handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Tax Map Key: {props.tmk}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            things go here
          </Offcanvas.Body>
        </Offcanvas>

      </Card.Body>
    </Card>
  )
}

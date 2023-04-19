import Card from 'react-bootstrap/Card'

export default function Property(props) {
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
        <Card.Text>
          Lava Zone: {props.lava_zone}
        </Card.Text>
        <Card.Text>
          District Zone: {props.district_zone}
        </Card.Text>
        <Card.Text>
          Realtor: {props.realtor_id}
        </Card.Text>
        {props.hoa_fee != null ? <Card.Text>HOA Fees: {props.hoa_fee}</Card.Text> : <Card.Text>HOA Fees: 0</Card.Text>}
        <Card.Link href='#assessment' className='text-decoration-none'>Assessments</Card.Link>
        <Card.Link href='#sale-records' className='text-decoration-none'>Sale Records</Card.Link>
      </Card.Body>
    </Card>
  )
}

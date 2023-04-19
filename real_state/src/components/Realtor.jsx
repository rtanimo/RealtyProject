import Card from 'react-bootstrap/Card'

export default function Realtor(props) {
  return (
    <Card style={{width: "20rem"}}>
        <Card.Body>
            <Card.Title>
                {props.first_name} {props.last_name}
            </Card.Title>
            <Card.Text>
                Email: {props.email}
            </Card.Text>
            <Card.Text>
                Phone Number: {props.phone_number}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

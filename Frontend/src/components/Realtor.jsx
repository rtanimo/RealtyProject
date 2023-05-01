import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Realtor(props) {

    // Still need to finish mailto:?
    function handleOnClick() {
        window.alert("Email")
    }
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
            <Button variant='primary' onClick={handleOnClick}>Contact</Button>
        </Card.Body>
    </Card>
  )
}

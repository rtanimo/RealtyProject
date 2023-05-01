import Card from 'react-bootstrap/Card'

export default function SaleRecord(props) {
  return (
    <Card style={{width: "20rem"}}>
      <Card.Body>
        <Card.Title>
          TMK: {props.tmk}
        </Card.Title>
        <Card.Text>
        Year: {props.year}
        </Card.Text>
        <Card.Text>
        Price: {props.sale_price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

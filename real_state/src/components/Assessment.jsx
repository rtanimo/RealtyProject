import Card from 'react-bootstrap/Card'

// export default function Assessment(props) {
//   return (
//     <div>
//         <h6>TMK: {props.tmk}</h6>
//         <ul>
//             <li>Year: {props.year}</li>
//             <li>Assessed Value: {props.assessed_value}</li>
//             <li>Market Value: {props.market_value}</li>
//             <li>Estimated Property Tax: {props.estimated_property_tax}</li>
//         </ul>
//     </div>
//   )
// }

export default function Assessment(props) {
  return (
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>
          TMK: {props.tmk}
        </Card.Title>
        <Card.Text>
          Year: {props.year}
        </Card.Text>
        <Card.Text>
          Assessed Value: {props.assessed_value}
        </Card.Text>
        <Card.Text>
          Market Value: {props.market_value}
        </Card.Text>
        <Card.Text>
          Estimated Property Tax: {props.estimated_property_tax}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

import React from 'react'

export default function Assessment(props) {
  return (
    <div>
        <h6>TMK: {props.tmk}</h6>
        <ul>
            <li>Year: {props.year}</li>
            <li>Assessed Value: {props.assessed_value}</li>
            <li>Market Value: {props.market_value}</li>
            <li>Estimated Property Tax: {props.estimated_property_tax}</li>
        </ul>
    </div>
  )
}

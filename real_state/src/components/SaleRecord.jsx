import React from 'react'

export default function SaleRecord(props) {
  return (
    <div>
        <h6>TMK: {props.tmk}</h6>
        <ul>
            <li>Year: {props.year}</li>
            <li>Price: {props.sale_price}</li>
        </ul>
    </div>
  )
}

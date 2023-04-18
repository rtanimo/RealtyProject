import React from 'react'

export default function Property(props) {
  return (
    <div>
        <h6>{props.street_num} {props.street_name}</h6>
        <h6>{props.city}, {props.state} {props.zipcode}</h6>
        <ul>
            <li>Asking Price: {props.asking_price}</li>
            <li>Lava Zone: {props.lava_zone}</li>
            <li>District Zone: {props.district_zone}</li>
            <li>Realtor: {props.realtor_id}</li>
            {props.hoa_fee != null && <li>HOA Fee: {props.hoa_fee}</li>}
        </ul>
    </div>
  )
}

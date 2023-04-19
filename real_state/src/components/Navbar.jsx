import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to= "/property">Properties</Link></li>
        <li><Link to="/sales-records">Sale Records</Link></li>
        <li><Link to="/assessments">Assessments</Link></li>
        <li><Link to="/realtors">Realtor</Link></li>
      </ul>
    </div>
  )
}

import {React, useState, useEffect} from 'react'
import axios from 'axios'
import List from './List'


export default function App() {

  const [property, setProperty] = useState([])

  useEffect(() => {
      axios.get("http://localhost:3000").then((response) => {
          setProperty(response.data)
      })
  },[])

  if (!property) return null;
  
  return(
  <div>
    <h1>Home Page</h1>
    {/* {property.map((newProperty) => (
      <Property 
        key={newProperty.TMK}
        Asking_Price={newProperty.Asking_Price}
      />
    ))} */}
    <List />
  </div>
  )
}
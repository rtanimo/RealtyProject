import {React, useState, useEffect} from 'react'
import axios from 'axios'
import Property from './Property'

// const baseURL = "https//localhost:3000";

export default function List() {
    const [property, setProperty] = useState([])

    useEffect(() => {
        axios.get("/api/property").then((response) => {
            setProperty(response.data)
        })
    },[])

    if (!property) return null;
    
    return (
        <div>
            <h1>Property List</h1>
            {property.map((newProperty) => (
                <Property 
                    key={newProperty.TMK}
                    Asking_Price={newProperty.Asking_Price}
                />
            ))}
        </div>
    )
}
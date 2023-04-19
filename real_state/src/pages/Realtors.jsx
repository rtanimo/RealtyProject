import {useState, useEffect} from 'react'
import axios from 'axios'
import Realtor from '../components/Realtor'

export default function Realtors() {
    const [realtors, setRealtors] = useState([])

    useEffect( () => {
        axios.get('/api/realtors').then( (response) => {
            setRealtors(response.data)
        }, [])
    })
    return (
        <div className="container">
            <h1 className='text-center pb-4'>Available Realtors</h1>
            <div className="col">
                <div className="row">
                    {realtors.map( (person) => (
                        <Realtor 
                            key={person.Agent_Num}
                            first_name={person.First_Name}
                            last_name={person.Last_Name}
                            email={person.Email}
                            phone_number={person.Phone_Num}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

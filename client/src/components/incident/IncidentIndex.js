import React, { useState, useEffect } from 'react'
import useQuery from '../../hooks/useQuery'
import IncidentList from './IncidentList'
import IncidentCreate from './IncidentCreate'

export default function IncidentIndex({user, handleSubmit}) {
    const [incidents , setIncidents] = useState(null)
    
     const {data: results, isLoaded} = useQuery('/incidents') 

     useEffect(()=>{
        setIncidents(results)
     },[results, isLoaded])
  return (
    <div className='displayDiv'> 
        <IncidentCreate handleSubmit={handleSubmit}/>
        <div>
        <IncidentList incidents={incidents}/>
        
        </div>
    </div>
  )
}

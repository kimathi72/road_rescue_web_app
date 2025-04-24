import React, { useEffect, useState } from 'react'
import IncidentForm from './IncidentForm'

export default function IncidentCreate({user}) {
    const [incidentData, setIncidentData]= useState({})
    useEffect(()=>{
        if(user){
            setIncidentData(prev=>({...prev,"driver_id": user.id}))
        }
    },[user])
    const handleSubmit= async(e)=>{
        
        e.preventDefault()
        console.log(incidentData)

        // try {
        //     const response = await fetch('/requests', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${token}` 
        //         },
        //         body: JSON.stringify({request: incidentData})
        //     })
        //     const data = await response.json()
        //     console.log(data)
        // }catch(error){
        //     console.log(error)
        // }

    }
    return (
        <IncidentForm handleSubmit={handleSubmit} setIncidentData={setIncidentData}/>
    )  
}

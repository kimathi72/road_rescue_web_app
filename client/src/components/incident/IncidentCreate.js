import React, { useEffect, useState } from 'react'
import IncidentForm from './IncidentForm'

export default function IncidentCreate({handleSubmit}) {
    const [incident, setIncident] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    useEffect(()=>{
      console.log(incident)
        isSubmitted && handleSubmit('/incidents', "POST", incident)
    },[isSubmitted, incident, handleSubmit])
  return (
    <div>
        <h2>Incident create</h2>
        <IncidentForm setIncident={setIncident} incident={incident} setIsSubmitted={setIsSubmitted}/>
    </div>
  )
}

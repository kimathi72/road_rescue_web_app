import React from 'react'
import Container from 'react-bootstrap/Container'
import IncidentForm from '../incident/IncidentForm'
export default function IncidentReporting({driver}) {
  
  return (
    <Container>
       <IncidentForm driver={driver}/>
    </Container>
  )
}

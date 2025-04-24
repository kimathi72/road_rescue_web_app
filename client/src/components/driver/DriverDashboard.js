import React from 'react'
import IncidentCreate from '../incident/IncidentCreate'
import IncidentList from '../incident/IncidentList'
import Container from 'react-bootstrap/esm/Container'

export default function DriverDashboard({user}) {
  return (
    <Container className='flex flex-column gap-1 align-items-center m-5 p-5 '>
      <IncidentCreate user={user}/>
      <IncidentList/>  
    </Container>
  )
}

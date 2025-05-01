import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import RequestIndex from '../incident/RequestIndex'

export default function DriverDashboard({user}) {
  return (
    <Container className='flex flex-column gap-1 align-items-center m-5 p-5 '>
      <RequestIndex user={user}/>
    </Container>
  )
}

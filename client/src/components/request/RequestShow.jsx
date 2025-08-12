import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useQuery from '../../hooks/useQuery'
import Map from '../location/Map'
export default function RequestShow({role}) {
  const [action,setAction] = useState(<></>)
  const params = useParams()
  const id = params.id 
  const {data:request, isLoaded} = useQuery(`/requests/${id}`)
  const dateCreated = new Date(!!request && request['created_at']).toString()
  useEffect(()=>{
    switch (role) {
      case 'driver':
        setAction(<>
        <Button >Edit Request</Button>
        <Button>Cancel Request</Button>
        </>)
        
        break;
      case 'provider':
        if (!request['user_id']){
setAction(<>
        <Button >Decline Request</Button>
        <Button>Accept Request</Button>
        </>)
        }else{
          setAction(<>
          <Button>Cancel Request</Button>
          <Button>Invoice</Button>
          </>)
        }
        
        
        break;
    
      default:
        setAction(<><Button>Cancel Request</Button>
        <Button>Delete Request</Button></>)
        break;
    }
  },[role])
  return (
   isLoaded ? <div>
    <h3>Request Details</h3>
    <Stack>
      <Stack>
        <small>created at: {dateCreated}</small>
        <small>Location: {request.location.city}</small>
      </Stack>
      <Stack>
        <h4>{request.service.name} - {request.vehicle['plate_number']}</h4>
        <p>{request['request_description']} </p>
      </Stack>
      <Stack>
        <h4>Live Location</h4>
        <Map position={[request['location']['latitude'], request['location']['longitude']]}/>
      </Stack>
      <Stack>
        {action}
      </Stack>
    </Stack>

   </div> : <p>Loading Request. . .</p>
  )
}

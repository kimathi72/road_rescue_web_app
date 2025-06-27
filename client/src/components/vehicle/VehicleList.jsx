import React, { useState ,useEffect } from 'react'
import useQuery from '../../hooks/useQuery';
import { Button, Stack } from '@mui/material';
import TableCustomized from '../util/TableCustomized';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function VehicleList() {
  const {data:vehicles, isLoaded} = useQuery('/vehicles')
  const [tableContent, setTableContent] = useState([])
   useEffect(()=>{
      !!vehicles && vehicles.length > 0 && setTableContent(vehicles.map(vehicle=>{
        const {user,id, incidents, insurance_policy, ...rest} = vehicle
         return {...rest, actions: 
         <Button href={`/vehicles/${vehicle.id}`} startIcon={<VisibilityIcon/>}>view</Button>
         }
      }))
    },[vehicles])
  return (
    <Stack direction={'column'} textAlign={'center'}>
      <h3 style={{color: "green" }}>Vehicles List</h3>
        
        {
                 isLoaded ? tableContent.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Vehicles found</p> : <p>fetching vehicles</p>
               }

    </Stack>
  )
}

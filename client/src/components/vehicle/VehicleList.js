import React, { useState ,useEffect } from 'react'
import useQuery from '../../hooks/useQuery';
import { Button, Stack } from '@mui/material';
import TableCustomized from '../util/TableCustomized';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function VehicleList() {
  const {data:vehicles, isLoaded} = useQuery('/vehicles')
  const [tableContent, setTableContent] = useState([])
   useEffect(()=>{
      isLoaded && setTableContent(vehicles.map(vehicle=>{
        const {user, incidents, insurance_policy, ...rest} = vehicle
         return {...rest, actions: 
         <Button href={`/${vehicle.id}`} startIcon={<VisibilityIcon/>}>view</Button>
         }
      }))
    },[vehicles,isLoaded])
  return (
    <Stack direction={'column'} textAlign={'center'}>
        <Stack direction={'row'}>
      <h3 style={{ textAlign: "center", color: "green" }}>Vehicles List</h3>
        </Stack>
        
        {
                 isLoaded ? tableContent.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Incidents found</p> : <p>fetching incidents</p>
               }

    </Stack>
  )
}

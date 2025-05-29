import React, { useState ,useEffect } from 'react'
import useQuery from '../../hooks/useQuery';
import { Link, Stack } from '@mui/material';
import TableCustomized from '../util/TableCustomized';

export default function VehicleList() {
  const {data:vehicles, isLoaded} = useQuery('/vehicles')
  const [tableContent, setTableContent] = useState([])
   useEffect(()=>{
      isLoaded && setTableContent(vehicles.map(vehicle=>{
        const {user, incidents, insurance_policy, ...rest} = vehicle
         return {...rest, actions: <Stack direction={'row'} spacing={1}>
         <Link>view</Link>
         <Link>delete</Link>
         
         </Stack>}
      }))
    },[vehicles,isLoaded])
  return (
    <Stack direction={'column'} textAlign={'center'}>

        <h3 style={{ textAlign: "center", color: "green" }}>Vehicles List</h3>
        {
                 isLoaded ? tableContent.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Incidents found</p> : <p>fetching incidents</p>
               }

    </Stack>
  )
}

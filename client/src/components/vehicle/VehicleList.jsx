import React, { useState ,useEffect } from 'react'
import useQuery from '../../hooks/useQuery';
import {Link} from 'react-router-dom'
import { Button, Grid } from '@mui/material';
import TableCustomized from '../util/TableCustomized';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function VehicleList() {
  const {data:vehicles, isLoaded} = useQuery('/vehicles')
  const [tableContent, setTableContent] = useState([])
   useEffect(()=>{
      !!vehicles && vehicles.length > 0 && setTableContent(vehicles.map(vehicle=>{
        console.log(vehicle)
        const {requests, user, ...rest} = vehicle
         return {...rest}
      }))
    },[vehicles])
  return (
    <Grid container direction={'column'} textAlign={'center'}>
      <Link to='/vehicles/create'>Add new vehicle</Link>

      <h3 style={{color: "green" }}>Vehicles List</h3>
        
        {
                 isLoaded ? tableContent.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Vehicles found</p> : <p>fetching vehicles</p>
               }

    </Grid>
  )
}

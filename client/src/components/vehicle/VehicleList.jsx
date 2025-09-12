import React, { useState ,useEffect } from 'react'

import { Grid } from '@mui/material';
import TableCustomized from '../util/TableCustomized';

export default function VehicleList({vehicles}) {
  const [tableContent, setTableContent] = useState([])
   useEffect(()=>{
      !!vehicles && vehicles.length > 0 && setTableContent(vehicles)
    },[vehicles])
  return (
    <Grid container direction={'column'} textAlign={'center'}>

      <h3 style={{color: "green" }}>Vehicles List</h3>
        
        {
                 isLoaded ? tableContent.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Vehicles found</p> : <p>fetching vehicles</p>
               }

    </Grid>
  )
}

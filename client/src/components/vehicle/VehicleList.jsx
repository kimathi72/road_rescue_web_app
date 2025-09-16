import React, { useState ,useEffect } from 'react'

import { Button, Grid } from '@mui/material';
import TableCustomized from '../util/TableCustomized';

export default function VehicleList({vehicles}) {
  const [tableContent, setTableContent] = useState([])
   useEffect(()=>{
      setTableContent(!!vehicles && vehicles.length > 0 && vehicles.map(vehicle=>{
        const {id, plate_number, make, model, color, year, created_at, ...rest} = vehicle
        return {"index": id,
          "plate number": plate_number,
          "make": make,
          "model": model,
          "color": color || "N/A",
          "year": year || "N/A",
          "created": new Date(created_at).toLocaleString(),
          "action": <Button color='error' href={`/vehicles/${vehicle.id}/delete`}>Delete</Button>
        }
      }))
    },[vehicles])
  return (
    <Grid container direction={'column'} textAlign={'center'}>

      <h3 style={{color: "green" }}>Vehicles List</h3>
        
        {
                 !!vehicles ? tableContent.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Vehicles found</p> : <p>fetching vehicles</p>
               }

    </Grid>
  )
}

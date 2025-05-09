import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Stack, TextField } from '@mui/material'
import DateTimePickerJs from '../navigation/DateTimePickerJs';


export default function IncidentForm({driver}) {
  const [incident, setIncident] = useState({})
  useEffect(()=>{
    console.log(driver)
          setIncident((prev)=>({...prev,"driver_id": driver.id}))
  },[driver])
  useEffect(()=>{
    
    console.log(incident)
  },[incident])

  return (
    <div>
      <h1>Report new Incident</h1>
      <form className='form'>
        <Stack spacing={2}> 
          <DateTimePickerJs setData={setIncident}/>

            <FormControl  sx={{ m: 1, minWidth: 80 }}>
       <InputLabel id="selectVehicleLabel">Vehicle</InputLabel>
        <Select
          labelId="selectVehicleLabel"
          id="vehicleSelect"
          label="Vehicle"
          value={incident['vehicle_id'] || ''}
          onChange={(e)=>{console.log(e.target)}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
       </FormControl>

       
       
        <FormControl fullWidth>
        <TextField
        label= "Description"
         multiline minRows={4}/>
        </FormControl>
        </Stack>
      </form>
    </div>
  )
}

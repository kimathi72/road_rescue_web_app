import { Button, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'

export default function VehicleCreate({driver, setIsSubmitted, setVehicle}) {
  const handleChange = (e) => {
    setVehicle((prev) => ({...prev, [`${e.target.name}`]: e.target.value}))
  }
  useEffect(()=>{
    if(driver){setVehicle((prev)=>({...prev, "user_id": driver.id}))}
  },[driver, setVehicle])
  return (
    <form className='form' onSubmit={(e)=>{
      e.preventDefault()
      setIsSubmitted(true)
    }}>
      <Stack direction={"column"} spacing={2}>
        <h2> Add a vehicle</h2>
        <Stack direction={"row"} spacing={2}>
        <TextField
          label= "Plate Number"
          name="plate_number"
          onChange={handleChange}
      />
      <TextField
      label= "Vehicle Make"
          name="make"
          onChange={handleChange}
      />
      </Stack>
      <Stack direction={"row"} spacing={2}>
         <TextField
         label= "Model of Vehicle"
          name="model"
          onChange={handleChange}/>
      <TextField
      label= "Year of Manufacture"
          name="year"
          onChange={handleChange}
      />
      </Stack>
      <Button type='submit'>Add Vehicle</Button>
      </Stack>
      
     
      
    </form>
  )
}

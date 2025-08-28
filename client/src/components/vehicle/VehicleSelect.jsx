import React from 'react'
import {FormControl, InputLabel } from '@mui/material'
import AutoComplete from '../util/AutoComplete'

export default function VehicleSelect({setData , value}) {
  return (<FormControl sx={{display:"flex", flexDirection: "row", alignItems:"center", justifyContent:"space-between"}}>
      <AutoComplete url={'/vehicles'} k='plate_number'
      value={value}
      lb='select vehicle'
       setData={(value)=>setData(prev=> ({...prev,"vehicle_id":value.id}))}/>
      
      </FormControl>
    
  )
}

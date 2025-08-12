import React from 'react'
import {FormControl, InputLabel } from '@mui/material'
import AutoComplete from '../util/AutoComplete'
import {Link} from 'react-router-dom'

export default function VehicleSelect({setData}) {
  return (<FormControl sx={{display:"flex", flexDirection: "row", alignItems:"center", justifyContent:"space-between"}}>
      <AutoComplete url={'/vehicles'} k='plate_number'
      lb='select vehicle'
       setData={(value)=>setData(prev=> ({...prev,"vehicle_id":value.id}))}/>
      <Link to='/add_vehicle'>Add new vehicle</Link>
      </FormControl>
    
  )
}

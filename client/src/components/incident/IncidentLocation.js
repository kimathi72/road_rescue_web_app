import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useQuery from '../../hooks/useQuery';
import Chip from '@mui/material/Chip';

export default function IncidentLocation (){
    const {data: locations, isLoaded} = useQuery({url: "/locations", method: "GET"})
    
    return(
        isLoaded && <Autocomplete
        disablePortal
        options={locations.sort((a, b) => a.city.localeCompare(b.city))}
        getOptionLabel={option => option['city']}
        renderValue={(value, getItemProps)=>{
            console.log(value)
           return <Chip label={value.city} {...getItemProps()} />
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Location" />}
      />
    )
}
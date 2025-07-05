import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useQuery from '../../hooks/useQuery';
import Chip from '@mui/material/Chip';

export default function AutoComplete ({url, k, setData, lb}){

    const {data: results, isLoaded} = useQuery(url)
    //prop 'lb' expects two worded string, the secong word references db table 
    //objKey returns lowercase last word in 'lb' string plus id at the end. reference FK in db table
    const objKey = lb.toString().toLowerCase().split(' ')[1] + '_id' 
    return(
        isLoaded && <Autocomplete
        disablePortal
      options={(results.length && results)|| []}
        getOptionLabel={option => option[`${k}`]}
        renderValue={(value, getItemProps)=>{
           return <Chip label={value[`${k}`]} {...getItemProps()} />
        }}
        onChange={( e ,value)=>{value && setData(value)
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={lb} />}
      />
    )
}
import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useQuery from '../../hooks/useQuery';
import Chip from '@mui/material/Chip';

export default function AutoComplete ({url, k, callBackFn, lb}){
    const {data: results, isLoaded} = useQuery(url)
    
    return(
        isLoaded && <Autocomplete
        disablePortal
      options={(results.length && results.sort((a, b) => a[`${k}`].localeCompare(b[`${k}`])) )|| []}
        getOptionLabel={option => option[`${k}`]}
        renderValue={(value, getItemProps)=>{
           return <Chip label={value[`${k}`]} {...getItemProps()} />
        }}
        onChange={( e ,value)=>{value && callBackFn(value.id)}}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={lb} />}
      />
    )
}
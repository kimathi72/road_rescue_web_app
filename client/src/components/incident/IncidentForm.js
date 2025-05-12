import React from 'react'
import AutoComplete from '../util/AutoComplete'
import { Button, Stack, TextField } from '@mui/material'

export default function IncidentForm({setIsSubmitted, setIncident}) {
  return (
    <form onSubmit={(e)=>{
        e.preventDefault()
        setIsSubmitted(true)}}>
          <Stack spacing={2}>
          <Stack direction={'row'} spacing={2}>
            <AutoComplete
            url='/vehicles' 
            k={'plate_number'}
            callBackfn={setIncident}
            lb='Select Vehicle'
            />
            <AutoComplete
            url='/locations' 
            k={'city'}
            callBackfn={setIncident}
            lb='Select Location'
            /></Stack>
            <TextField
            multiline 
            placeholder='Add Description'
            minRows={3}
            onChange={(value)=> setIncident((prev)=>({...prev, "description": value}))}
            />
            <Button type='submit'>Submit</Button>
            </Stack>
            
        </form>
  )
}

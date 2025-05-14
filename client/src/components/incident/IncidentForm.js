import React from 'react'
import AutoComplete from '../util/AutoComplete'
import { Button, Stack, TextField } from '@mui/material'
import DatePicker from '../util/DatePicker'

export default function IncidentForm({setIsSubmitted, setIncident}) {
  return (
    <form className='form' onSubmit={(e)=>{
        e.preventDefault()
        setIsSubmitted(true)}}>
          <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
            />
            <DatePicker setData={setIncident}/>
            </Stack>
            <TextField
            multiline 
            placeholder='Add Description'
            minRows={3}
            onChange={(e)=> setIncident((prev)=>({...prev, "description": e.target.value}))}
            />
            <Button type='submit'>Submit</Button>
            </Stack>
            
        </form>
  )
}

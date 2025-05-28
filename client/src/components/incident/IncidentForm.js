import React from 'react'
import AutoComplete from '../util/AutoComplete'
import { Button, Stack, TextField } from '@mui/material'
import DatePicker from '../util/DatePicker'
import UploadWidget from '../util/UploadWidget'

export default function IncidentForm({setIsSubmitted,incident, setIncident}) {
  return (
    <form className='form' onSubmit={(e)=>{
        e.preventDefault()
        setIsSubmitted(true)
        }}>
          <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <AutoComplete
            url='/vehicles' 
            k={'plate_number'}
            setData={setIncident}
            lb='Select Vehicle'
            />
            <AutoComplete
            url='/locations' 
            k={'city'}
            setData={setIncident}
            lb='Select Location'
            />
            <DatePicker setData={setIncident} value={incident["date_happened"]}/>
            </Stack>
            <TextField
            multiline 
            placeholder='Add Description'
            minRows={3}
            onChange={(e)=> setIncident((prev)=>({...prev, "description": e.target.value}))}
            />
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <UploadWidget label={"Upload Police Abstract"} setData={(value)=>setIncident({...incident, "police_abstract_url": value})}/>
            <Button type='submit'>Submit</Button>
            </Stack>
            
            </Stack>
            
        </form>
  )
}

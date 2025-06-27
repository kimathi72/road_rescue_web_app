import AutoComplete from '../util/AutoComplete'
import { Button, Stack, TextField } from '@mui/material'
import DatePicker from '../util/DatePicker.jsx'

export default function IncidentForm({setIsSubmitted,incident, setIncident}) {
  return (
    <form className='form' onSubmit={(e)=>{
        e.preventDefault()
        setIsSubmitted(true)
        }}>
          <Stack spacing={2} textAlign={'center'}>
            <h3>Incident create</h3>
          <Stack direction={'column'} spacing={2}>
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
            id="description"
            placeholder='Add Description'
            minRows={3}
            onChange={(e)=> setIncident((prev)=>({...prev, [`${e.target.id}`]: e.target.value}))}
            />
            <Button type='submit'>Submit</Button>

            </Stack>
            
        </form>
  )
}

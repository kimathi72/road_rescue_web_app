import React from 'react'
import IncidentCreate from '../incident/IncidentCreate'
import IncidentList from '../incident/IncidentList'
import { Stack } from '@mui/material'

export default function IncidentReporting({handleSubmit}) {
  
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} margin={'1rem'} justifyContent={'space-around'}>
<IncidentList/>
<IncidentCreate handleSubmit={handleSubmit}/>
    </Stack>
  )
}

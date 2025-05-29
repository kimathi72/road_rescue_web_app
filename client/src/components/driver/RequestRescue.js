import React from 'react'
import RequestCreate from '../request/RequestCreate'
import RequestsList from '../request/RequestsList'
import { Stack } from '@mui/material'
export default function RequestRescue({handleSubmit}) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} margin={'1rem'} justifyContent={'space-around'}>
      <RequestsList/>
      <RequestCreate handleSubmit={handleSubmit}/>
        
    </Stack>
  )
}

import React from 'react'
import useQuery from '../../hooks/useQuery'
import { useParams } from 'react-router-dom'
import { Box, Stack } from '@mui/material'

export default function ClaimsShow() {
    const params = useParams()
    const {data: claim, isLoaded} = useQuery(`/claims/${params.id}`)
  return (
    <div>{
        isLoaded && <Stack>
            <Box>
                <p>{claim.id}</p>
               <p>{claim.status}</p> 
            </Box>
            <Box>
                {claim.incident.vehicle.plate_number}
            </Box>
        </Stack> 
        }</div>
  )
}

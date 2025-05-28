import { Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

export default function DriverDashboard({user}) {
   const {vehicles, incidents, requests, claims, ...rest} = user
  return (
   <h2>{rest.role} Dashboard
      <Stack direction={'row'} spacing={4}>
         <Card>
            <CardContent>
               <Typography>
                  {incidents.length} reported incidents
               </Typography>
            </CardContent>
         </Card>
         <Card>
            <CardContent>
               <Typography>
                  {claims.length} total claims
               </Typography>
            </CardContent>
         </Card>
         <Card>
            <CardContent>
               <Typography>
                  {requests.length} requests history 
               </Typography>
            </CardContent>
         </Card>
      </Stack>
   </h2>
    
  )
}

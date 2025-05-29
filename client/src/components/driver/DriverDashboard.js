import { Card, CardContent, Stack, Typography } from '@mui/material'
import VehicleCreate from '../vehicle/VehicleCreate.js'
import VehicleList from '../vehicle/VehicleList.js'


export default function DriverDashboard({user, handleSubmit}) {
   const {vehicles, incidents, requests, claims, ...rest} = user
   console.log(rest)
  return (
   
   <Stack direction={'column'} spacing={5} >
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent={'space-around'}>
         <Stack direction={'column'} spacing={5} margin={'1rem'}>
      <Stack direction={'row'} justifyContent={'space-evenly'}>
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
            <VehicleList/>
         </Stack>
      <VehicleCreate user={user} handleSubmit={handleSubmit} /> 
      </Stack>
      </Stack>
    
  )
}

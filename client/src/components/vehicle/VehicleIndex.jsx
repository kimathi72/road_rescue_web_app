import VehicleList from './VehicleList'
import VehicleCreate from './VehicleCreate'
import { Route, Routes} from 'react-router-dom'
import {Grid} from '@mui/material'

export default function VehicleIndex({user, handleSubmit}) {
    
  return (
    <Grid>
      
    <Routes>
      <Route path='/' element={<VehicleList /> }/>
      <Route path='/create' element={<VehicleCreate user={user} handleSubmit={handleSubmit}/> }/>
        
               
    </Routes>
    </Grid>
  )
}

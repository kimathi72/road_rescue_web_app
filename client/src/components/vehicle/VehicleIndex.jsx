import VehicleList from './VehicleList'
import VehicleCreate from './VehicleCreate'
import { Route, Routes } from 'react-router-dom'

export default function VehicleIndex({user, handleSubmit}) {
    
  return (
    <Routes>
      <Route path='/' element={<VehicleList /> }/>
      <Route path='/create' element={<VehicleCreate user={user} handleSubmit={handleSubmit}/> }/>
        
               
    </Routes>
  )
}

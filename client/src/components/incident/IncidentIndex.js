import useQuery from '../../hooks/useQuery'
import IncidentList from './IncidentList'
import IncidentCreate from './IncidentCreate'
import IncidentShow from './IncidentShow'
import { Route, Routes } from 'react-router-dom'

export default function IncidentIndex({user, handleSubmit}) {
    const {data: incidents, isLoaded} = useQuery('/incidents') 
      
  return (
    <div className='displayDiv'> 
      {user.role === "driver" && <IncidentCreate user={user} handleSubmit={handleSubmit}/>}
      { isLoaded && <Routes>
        <Route path='/' exact element={<IncidentList incidents={incidents}/>} />
        <Route path='/show'element={<IncidentShow/>} />
      </Routes>}
    </div>
  )
}

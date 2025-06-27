import useQuery from '../../hooks/useQuery'
import IncidentCreate from './IncidentCreate'
import { Route, Routes} from 'react-router-dom'

import IncidentList from './IncidentList'
import IncidentShow from './IncidentShow'
export default function IncidentIndex({handleSubmit, authorizedUser}) {
   const {data: results, isLoaded} = useQuery('/incidents')
      
  return (
   <div className='displayDiv '> 
   {authorizedUser('driver') && <IncidentCreate handleSubmit={handleSubmit}/>}
      <Routes>
        
        <Route path='/*' exact element={<IncidentList incidents={isLoaded && results} authorizedUser={authorizedUser}/>}  />
        <Route path='/:id' element={<IncidentShow/>} />
      </Routes>
    </div>
  )
}

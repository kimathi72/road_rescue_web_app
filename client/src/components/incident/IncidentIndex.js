import useQuery from '../../hooks/useQuery'
import IncidentCreate from './IncidentCreate'
import { Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react' 

import IncidentList from './IncidentList'
import IncidentPreview from './IncidentPreview'
export default function IncidentIndex({user, handleSubmit}) {
    const {data: results, isLoaded} = useQuery('/incidents') 
    const [incidents, setIncidents] = useState(null)
    

    useEffect(()=>{
        if (isLoaded) {setIncidents(results)}
       
    },[isLoaded,results])


      
  return (
    <div className='displayDiv '> 
      { incidents && <Routes>
        <Route path='/create' element={<IncidentCreate user={user} handleSubmit={handleSubmit}/>} />
        <Route path='/*' exact element={<IncidentList incidents={incidents} user={user}/>} />
        <Route path='/:id' element={<IncidentPreview/>} />
      </Routes>}
    </div>
  )
}

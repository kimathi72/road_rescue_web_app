import useQuery from '../../hooks/useQuery'
import IncidentCreate from './IncidentCreate'
import { Route, Routes} from 'react-router-dom'
import { useEffect, useContext, useState } from 'react' 
import { CableContext } from '../../context/cable';
import IncidentList from './IncidentList'
import IncidentPreview from './IncidentPreview'
export default function IncidentIndex({user, handleSubmit}) {
    const {data: results, isLoaded} = useQuery('/incidents') 
    const [incidents, setIncidents] = useState(null)
    const cableContext = useContext(CableContext)

    useEffect(()=>{
        if (isLoaded) {setIncidents(results)}
       
    },[isLoaded,results])


    useEffect(()=>{
        const newChannel = cableContext.cable.subscriptions.create(
    {
      channel: "IncidentChannel",
    },
    {
      // remember, the data being received and passed to the received
      // callback is an object structured like this:
      // { message: "some message" }
      received: (data) => console.log(data)
    })
    console.log(newChannel)
    },[cableContext, incidents])
      
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

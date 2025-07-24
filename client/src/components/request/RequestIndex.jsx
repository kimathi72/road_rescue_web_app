import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'
import { Route, Routes } from 'react-router-dom'
import RequestEdit from './RequestEdit'
import RequestShow from './RequestShow'
import RequestCreate from './RequestCreate'
import RequestOverview from './RequestOverview'
import RescueQueue from './RescueQueue'
export default function RequestIndex({user, handleSubmit}) {
    const {data: requests , isLoaded} = useQuery("/requests")
    
  return (
     <div>
        {isLoaded ? <Routes>
          <Route path='/show' element={<RequestShow/>}/>
          <Route path='/edit' element={<RequestEdit/>} />
          <Route path='/' exact element={(user.role === 'driver') ? <RequestCreate  handleSubmit={handleSubmit}/> : (user.role === 'admin') ? <RequestOverview/> :  <RequestsList requests={requests}/> } />
          <Route path='/queue' element={<RescueQueue />} />
        </Routes> : <p>Loading Requests</p> }
    </div>
  )
}

import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'
import { Route, Routes } from 'react-router-dom'
import RequestEdit from './RequestEdit'
import RequestShow from './RequestShow'
import RequestForm from './RequestForm'
export default function RequestIndex({user}) {
    const {data: requests , isLoaded} = useQuery("/requests")
  return (
     <div>
        {user.role === "driver" && <RequestForm  user={user}/> }
        {isLoaded ? <Routes>
          <Route path='/show' element={<RequestShow/>}/>
          <Route path='/edit' element={<RequestEdit/>} />
          <Route path='/' exact element={<RequestsList requests={requests}/>} />
        </Routes> : <p>Loading Requests</p> }
    </div>
  )
}

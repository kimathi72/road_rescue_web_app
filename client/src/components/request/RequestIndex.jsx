import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'
import { Route, Routes } from 'react-router-dom'
import RequestEdit from './RequestEdit'
import RequestShow from './RequestShow'
import RequestCreate from './RequestCreate'
export default function RequestIndex({user, handleSubmit}) {
    const {data: requests , isLoaded} = useQuery("/requests")
  return (
     <div>
        {isLoaded ? <Routes>
          <Route path='/create' element={<RequestCreate  handleSubmit={handleSubmit}/> }/>
          <Route path='/show' element={<RequestShow/>}/>
          <Route path='/edit' element={<RequestEdit/>} />
          <Route path='/' exact element={<RequestsList requests={requests}/>} />
        </Routes> : <p>Loading Requests</p> }
    </div>
  )
}

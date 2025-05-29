import RequestsList from '../request/RequestsList'
import RequestShow from '../request/RequestShow'
import { Route , Routes} from 'react-router-dom'
import { useEffect } from 'react'

export default function RequestsQueue({handleSubmit, user, authorizedUser }) {
    useEffect(()=>{
            authorizedUser('provider', user.role) 
        },[user, authorizedUser])
  return (
        <Routes>
            <Route path='/' element={<RequestsList/> }/>
            <Route path='/:id' element={<RequestShow/>}/>
        </Routes>
        
  )
}

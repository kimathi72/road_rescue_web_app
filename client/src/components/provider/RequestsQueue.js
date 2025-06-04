import RequestsList from '../request/RequestsList'
import RequestShow from '../request/RequestShow'
import { Route , Routes} from 'react-router-dom'
import { useEffect } from 'react'
import useQuery from '../../hooks/useQuery'

export default function RequestsQueue({handleSubmit, user, authorizedUser }) {
   const {data: requests, isLoaded} = useQuery('/requests')
    useEffect(()=>{
            authorizedUser('provider', user.role) 
        },[user, authorizedUser])
  return (
        <Routes>
            <Route path='/' element={<RequestsList user={user} requests={requests} isLoaded={isLoaded}/> }/>
            <Route path='/:id' element={<RequestShow/>}/>
        </Routes>
        
  )
}

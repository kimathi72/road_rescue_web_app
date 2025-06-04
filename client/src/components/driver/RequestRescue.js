import React, { useEffect } from 'react'
import { Route , Routes} from 'react-router-dom'
import RequestShow from '../request/RequestShow'
import RequestCreate from '../request/RequestCreate'
import RequestsList from '../request/RequestsList'
import useQuery from '../../hooks/useQuery'
export default function RequestRescue({ handleSubmit, user, authorizedUser }) {
  const {data: requests, isLoaded} = useQuery('/requests') 
  useEffect(()=>{
            authorizedUser('driver', user.role) 
        },[user, authorizedUser])
  return (
     <Routes>
                    <Route path='/' element={<RequestsList user={user} requests={requests} isLoaded={isLoaded}/> }/>
                    <Route path='/:id' element={<RequestShow/>}/>
                    <Route path='/create' element={<RequestCreate handleSubmit={handleSubmit}/>}/>
                </Routes>

  )
}

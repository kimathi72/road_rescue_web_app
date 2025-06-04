import React, { useEffect } from 'react'
import ClaimsList from '../claim/ClaimsList'
import { Route, Routes } from 'react-router-dom'
import ClaimsShow from '../claim/ClaimsShow'
import ClaimCreate from '../claim/ClaimCreate'
import useQuery from '../../hooks/useQuery'

export default function ClaimsTracking({handleSubmit, user, authorizedUser }) {
  const {data: claims, isLoaded} = useQuery('/claims')
    useEffect(()=>{
            authorizedUser('driver', user.role) 
        },[user, authorizedUser])
  return (
     <Routes>
              <Route path='/*'exact element={<ClaimsList claims={claims} isLoaded={isLoaded}/>}/>
              <Route path='/:id' element={<ClaimsShow/>}/>
              <Route path='/create' element={<ClaimCreate handleSubmit={handleSubmit}/>}/>
            </Routes>
  )
}

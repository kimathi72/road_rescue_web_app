import React, { useEffect } from 'react'
import useQuery from '../../hooks/useQuery'
import IncidentList from '../incident/IncidentList'
import IncidentPreview from '../incident/IncidentPreview' 
import { Route, Routes } from 'react-router-dom'

export default function AssignedIncidents({user, authorizedUser}) {
  const {data: incidents , isLoaded} = useQuery('/incidents')
      useEffect(()=>{
        authorizedUser('assessor', user.role) 
    },[user, authorizedUser])
  return (
    <Routes>
          <Route path='/*'exact element={<IncidentList incidents={incidents} isLoaded={isLoaded}/>}/>
          <Route path='/:id' element={<IncidentPreview/>}/>    
    
        </Routes>
  )
}

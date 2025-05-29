import React, { useEffect } from 'react'
import IncidentCreate from '../incident/IncidentCreate'
import IncidentList from '../incident/IncidentList'
import IncidentPreview from '../incident/IncidentPreview' 
import { Route, Routes } from 'react-router-dom'

export default function IncidentReporting({handleSubmit, user, authorizedUser }) {
    useEffect(()=>{
            authorizedUser('driver', user.role) 
        },[user, authorizedUser])
  
  return (
    <Routes>
      <Route path='/*'exact element={<IncidentList/>}/>
      <Route path='/:id' element={<IncidentPreview/>}/>
      <Route path='/create' element={<IncidentCreate handleSubmit={handleSubmit}/>}/>


    </Routes>
  )
}

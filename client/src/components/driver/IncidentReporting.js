import React, { useContext, useEffect } from 'react'
import IncidentCreate from '../incident/IncidentCreate'
import IncidentList from '../incident/IncidentList'
import IncidentPreview from '../incident/IncidentPreview' 
import { Route, Routes } from 'react-router-dom'
import useQuery from '../../hooks/useQuery'
import { CableContext } from '../../context/cable';

export default function IncidentReporting({handleSubmit, user, authorizedUser }) {
  const {data: incidents, isLoaded} = useQuery('/incidents')
  const cableContext = useContext(CableContext)
    useEffect(()=>{
            authorizedUser('driver', user.role) 
        },[user, authorizedUser])
  
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
    <Routes>
      <Route path='/*'exact element={<IncidentList user={user} incidents={incidents} isLoaded={isLoaded}/>}/>
      <Route path='/:id' element={<IncidentPreview/>}/>
      <Route path='/create' element={<IncidentCreate handleSubmit={handleSubmit}/>}/>


    </Routes>
  )
}

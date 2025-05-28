import React, { useEffect } from 'react'
import SideBar from '../navigation/SideBar'
import AssessorDashboard from './AssessorDashboard'
import Assessments from '../assessment/Assessments'
import { Route, Routes } from 'react-router-dom'
import useQuery from '../../hooks/useQuery'
export default function AssessorIndex({user, handleSubmit, authorized_user}) {
  const {data: assessor, isLoaded} = useQuery(`/users/${user.id}`)
  const links = [
    {
      url: '/assessor/dashboard',
      label: "Dashboard" 
    },{
      url: '/assessor/assessments',
      label: "Assessments" 
    }
  ]
    useEffect(()=>{
        authorized_user('assessor', user.role) 
    },[user, authorized_user])
  return (
    <div className='innerDiv'>
      <SideBar links={links}/>
      <div>
        {user && isLoaded && <Routes>
          <Route path='/' exact element={<AssessorDashboard user={assessor}/>} />
          <Route path='/dashboard' element={<AssessorDashboard user={assessor}/>} />
        <Route path='/assessments' element={<Assessments handleSubmit={handleSubmit}/>}/>
      </Routes>}</div>
    </div>
  )
}

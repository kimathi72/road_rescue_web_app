import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Assessments from '../assessment/Assessments'
import AssessmentCreate from '../assessment/AssessmentCreate'
import useQuery from '../../hooks/useQuery'

export default function AssessmentReporting({user,handleSubmit, authorizedUser}) {
  const {data: assessments, isLoaded} = useQuery('/assessments')
  useEffect(()=>{
        authorizedUser('assessor', user.role) 
    },[user, authorizedUser])
  return (
    <Routes>
        <Route path='/' element={<Assessments user={user} assessments={assessments} isLoaded={isLoaded}/>}/>
        <Route path='/create' element={<AssessmentCreate/>}/>
    </Routes>
  )
}

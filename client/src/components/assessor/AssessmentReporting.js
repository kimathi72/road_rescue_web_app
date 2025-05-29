import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Assessments from '../assessment/Assessments'
import AssessmentCreate from '../assessment/AssessmentCreate'

export default function AssessmentReporting({user,handleSubmit, authorizedUser}) {
  useEffect(()=>{
        authorizedUser('assessor', user.role) 
    },[user, authorizedUser])
  return (
    <Routes>
        <Route path='/' element={<Assessments/>}/>
        <Route path='/' element={<AssessmentCreate/>}/>
    </Routes>
  )
}

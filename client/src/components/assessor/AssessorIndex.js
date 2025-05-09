import React, { useEffect,  useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AssignedClaims from './AssignedClaims'
import AssessmentForm from './AssessmentForm' 
import FaultDetermination from './FaultDetermination'
import useQuery from '../../hooks/useQuery'
import AssessorDashboard from './AssessorDashboard.js'

export default function AssessorIndex({user,authorized_user}) {
    const {data: results, isLoaded} = useQuery(`/assessors/${user.id}`)
    const [assignedClaims, setAssignedClaims] = useState(null)
    useEffect(()=>{
    
        authorized_user('assessor', user.role)
        if(isLoaded){
            setAssignedClaims(results['assigned_claims'])
        }
    },[user, authorized_user, results, isLoaded])

  return (
    <div>
     { (isLoaded) ?  <div className='displayDiv'>
          <div className='sideBar'>
            <Link to={'/assessor/dashboard'}>Dashboard</Link>
            <Link to={'/assessor/assigned_claims'}>Assigned Claims</Link>
            <Link to={'/assessor/assessment_form'}>assessment_form</Link>
            <Link to={'/assessor/fault_determination'}>Fault Determination</Link>
          </div>
          <Routes>
            <Route path='/fault_determination' element={<FaultDetermination assignedClaims = {assignedClaims}/>}/>
            <Route path='/assigned_claims' element={<AssignedClaims assignedClaims = {assignedClaims}/>}/>
             <Route path='/assessment_form' element={<AssessmentForm assignedClaims = {assignedClaims}/>}/>
            <Route path='/' exact element={<AssessorDashboard assignedClaims = {assignedClaims}/>}/>
            <Route path='/dashboard' element={<AssessorDashboard assignedClaims = {assignedClaims}/>}/>
        </Routes> </div>: <p>Loading dashboard</p>}
        </div>
  )
}

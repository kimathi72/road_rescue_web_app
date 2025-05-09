import React, { useEffect } from 'react'
import ClaimsTracking from './ClaimsTracking'
import IncidentReporting from './IncidentReporting'
import useQuery from '../../hooks/useQuery'
import DriverDashboard from './DriverDashboard'
import VehicleList from './VehicleList'
import { Link, Route, Routes } from 'react-router-dom'


export default function DriverIndex({user, authorized_user}) {
    const {data: driver, isLoaded} = useQuery(`/drivers/${user.id}`)
    useEffect(()=>{
        authorized_user('driver', user.role) 
    },[user, authorized_user])
  return (
    <div>
{ (isLoaded) ? <div className='displayDiv'>
      <div className='sideBar'>
        <Link to={'/driver/dashboard'}>Dashboard</Link>
        <Link to={'/driver/incident_reporting'}>Incident Reporting</Link>
        <Link to={'/driver/claims_tracking'}>Claims Tracking</Link>
        <Link to={'/driver/vehicle_list'}>Vehicles List</Link>
      </div>
         <Routes>
        <Route path="/" exact element={<DriverDashboard driver={driver} />} />
        <Route path="/dashboard" element={<DriverDashboard driver={driver} />} />
        <Route path="/incident_reporting" element={<IncidentReporting driver={driver}   />} />
        <Route path="/claims_tracking" element={<ClaimsTracking  driver={driver}/>} />
        <Route path="/vehicle_list" element={<VehicleList  driver={driver} />}  />
      </Routes></div> : <p>Loading...</p>} 
    </div>
  )
}

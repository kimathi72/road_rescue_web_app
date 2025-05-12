import React from 'react'
import DriverDashboard from './DriverDashboard'
import { Route, Routes } from 'react-router-dom'
import IncidentIndex from '../incident/IncidentIndex'
import SideBar from '../navigation/SideBar'
import ClaimsIndex from '../claim/ClaimsIndex'
import RequestIndex from '../incident/RequestIndex'

export default function DriverIndex({user,handleSubmit}) {
    const links = [
        {
            url: "/driver/dashboard",
            label: "Dashboard"
    },  {
url: "/driver/incident_reporting/*",
            label: "Incident Reporting"
    },  {
        url: "/driver/claims_tracking/*",
        label: "Claims Tracking"
    },  {
        url: "/driver/requests/*",
        label: "Rescue requests"
    },]
  return (
    <div className="innerDiv">
        <SideBar links={links}/>
        <div>
        <Routes>
            <Route path={'/incident_reporting/*'} element={<IncidentIndex user={user} handleSubmit={handleSubmit} />}/>
            <Route path={'/claims_tracking/*'} element= {<ClaimsIndex user={user}/>} />
            <Route path='/' exact element={<DriverDashboard/>} />
            <Route path='/dashboard' exact element={<DriverDashboard/>} />
            <Route path="/requests/*" element={<RequestIndex/>}/>
        </Routes>
        </div>
        
    </div>
  )
}

import React, { useEffect} from 'react'
import DriverDashboard from './DriverDashboard'
import { Route, Routes } from 'react-router-dom'
import IncidentIndex from '../incident/IncidentIndex'
import SideBar from '../navigation/SideBar'
import ClaimsIndex from '../claim/ClaimsIndex'
import RequestIndex from '../incident/RequestIndex'
import VehicleIndex from '../vehicle/VehicleIndex'
import useQuery from '../../hooks/useQuery'

export default function DriverIndex({user,handleSubmit, authorized_user}) {
    const {data: driver, isLoaded} = useQuery(`/drivers/${user.id}`)
    const links = [
        {
            url: "/driver/dashboard",
            label: "Dashboard"
    },  {
url: "/driver/incident_reporting/*",
            label: "Incident Reporting"
    },  {
        url: "/driver/claims_tracking",
        label: "Claims Tracking"
    },  {
        url: "/driver/requests",
        label: "Rescue requests"
    },  {
        url: "/driver/vehicles_list",
        label: "Vehicles List"
    },]
    useEffect(()=>{
        if (user) authorized_user('driver', user.role) 
    },[user, authorized_user])
  return (
    <div className="innerDiv">
        <SideBar links={links}/>
        <div>
       {isLoaded && <Routes>
            <Route path={'/incident_reporting/*'} element={<IncidentIndex user={driver} handleSubmit={handleSubmit} />}/>
            <Route path={'/claims_tracking/*'} element= {<ClaimsIndex user={driver}/>} />
            <Route path='/' exact element={<DriverDashboard user={driver}/>} />
            <Route path='/dashboard' exact element={<DriverDashboard user={driver}/>} />
            <Route path="/requests/*" element={<RequestIndex user={driver}/>}/>
            <Route path="/vehicles_list" element={<VehicleIndex user={driver} handleSubmit={handleSubmit}/>}/>
        </Routes>}
        </div>
        
    </div>
  )
}

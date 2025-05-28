import React, { useEffect} from 'react'
import DriverDashboard from './DriverDashboard'
import { Route, Routes } from 'react-router-dom'
import SideBar from '../navigation/SideBar'
import RequestIndex from '../request/RequestIndex'
import VehicleIndex from '../vehicle/VehicleIndex'
import useQuery from '../../hooks/useQuery'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import StreamIcon from '@mui/icons-material/Stream';
import SupportIcon from '@mui/icons-material/Support';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import CommuteIcon from '@mui/icons-material/Commute';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ClaimsList from '../claim/ClaimsList'
import IncidentIndex from '../incident/IncidentIndex'

export default function DriverIndex({user,handleSubmit, authorized_user}) {
    const {data: driver, isLoaded} = useQuery(`/users/${user.id}`)
    const links = [
      
  { label: "Dashboard", icon: <SpaceDashboardIcon/>, url: "/driver/dashboard" },
  { label: "Report Incident", icon: <CarCrashIcon/>, url: "/driver/incidents/create" },
  { label: "My Incidents", icon: <StreamIcon/>, url: "/driver/incidents" },
  { label: "Request Rescue", icon: <SupportIcon/>, url: "/driver/requests/create" },
  { label: "My Claims", icon: <FindInPageIcon/>, url: "/driver/claims" },
  { label: "Vehicles", icon: <CommuteIcon/>, url: "/driver/vehicles" },
  { label: "Messages", icon: <QuestionAnswerIcon/>, url: "/driver/messages" },

]
    useEffect(()=>{
        if (user) authorized_user('driver', user.role) 
    },[user, authorized_user])
  return (
    <div className="innerDiv">
        <SideBar links={links}/>
        <div>
       {user && isLoaded && <Routes>
        {/* <Route path={'/incidents/:id'} element={<IncidentPreview />}/>
        <Route path={'/incidents/create'} element={<IncidentCreate handleSubmit={handleSubmit} />}/> */}
        <Route path={'/incidents/*'} element={<IncidentIndex user={driver} handleSubmit={handleSubmit}/>}/>
        <Route path={'/claims'} element= {<ClaimsList user={driver} claims={driver.claims}/>} />
        <Route path='/' exact element={<DriverDashboard user={driver}/>} />
        <Route path='/dashboard' exact element={<DriverDashboard user={driver}/>} />
        <Route path="/requests/*" element={<RequestIndex user={driver} handleSubmit={handleSubmit}/>}/>
        <Route path="/vehicles/*" element={<VehicleIndex user={driver} handleSubmit={handleSubmit}/>}/>
        </Routes>}
        </div>
        
    </div>
  )
}

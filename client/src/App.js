import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/navigation/NavBar.js";
import Signin from "./components/auth/Signin.js";
import Signup from "./components/auth/Signup.js";
import Signout from "./components/auth/Signout.js";
import "./assets/styles/mystyles.css";
import Home from "./components/navigation/Home.js";
import SideBar from "./components/navigation/SideBar.js";
import { Stack } from "@mui/material";


import RequestRescue from "./components/driver/RequestRescue.js";
import IncidentReporting from "./components/driver/IncidentReporting.js";
import ClaimsTracking from "./components/driver/ClaimsTracking.js";
import UsersDashboard from './components/admin/UsersDashboard.js'
import Invoices from "./components/provider/Invoices.js";
import RequestsQueue from './components/provider/RequestsQueue.js'
import AssessmentTracking from "./components/insurer/AssessmentTracking.js";
import IncidentsTracking from "./components/insurer/IncidentsTracking.js";
import ClaimsQueue from "./components/insurer/ClaimsQueue.js";
import AssignedIncidents from "./components/assessor/AssignedIncidents.js";
import AssessmentReporting from './components/assessor/AssessmentReporting.js'

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import SupportIcon from '@mui/icons-material/Support';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SubjectIcon from '@mui/icons-material/Subject';
import ViewListIcon from '@mui/icons-material/ViewList';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReportIcon from '@mui/icons-material/Report';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


export default function App() {

  //set user State , default to null, update state on sign in/up
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("jwt");
  const [isLoaded, setIsLoaded] = useState(false)
  const [links, setLinks] = useState([])

  // define navigation pointer
  const navigate = useNavigate();
  useEffect(()=>{
    switch (!!user && user.role) {
    case "driver":
      setLinks([
        {
          path:'/',
          label: 'DashBoard', 
          icon: <SpaceDashboardIcon/>
        },{
          path:'/request_rescue',
          label: 'Request Rescue', 
          icon: <SupportIcon/>
        },{
          path:'/incident_reporting',
          label: 'Incident Reporting',
           icon: <CarCrashIcon/>
        },{
          path:'/claims_tracking',
          label: 'Claims Tracking', 
          icon: <FindInPageIcon/> 
        },
      ])
      break;
      case "admin":
      setLinks([
        {
          path:'/',
          label: 'DashBoard', 
          icon: <SpaceDashboardIcon/>
        },{
          path:'/user_management',
          label: 'User Management', 
          icon: <ManageAccountsIcon/>
        }
      ])
      break;
      case "insurer":
      setLinks([
        {
          path:'/',
          label: 'DashBoard', 
          icon: <SpaceDashboardIcon/>
        },{
          path:'/claims_queue',
          label: 'Claims Queue', 
          icon: <SubjectIcon/>
        },{
          path:'/reported_incidents',
          label: 'Incidents List',
           icon: <CarCrashIcon/>
        },{
          path:'/assessments_tracking',
          label: 'Assessments Tracking', 
          icon: <FindInPageIcon/> 
        },
      ])
      break;
      case "assessor":
      setLinks([
        {
          path:'/',
          label: 'DashBoard', 
          icon: <SpaceDashboardIcon/>
        },{
          path:'/assigned_incidents',
          label: 'Assigned Incidents', 
          icon: <ReportIcon/>
        },{
          path:'/assessments_reporting',
          label: 'Assessment Reporting',
           icon: <CreateNewFolderIcon/>
        }
      ])
      break;
      case "provider":
      setLinks([
        {
          path:'/',
          label: 'DashBoard', 
          icon: <SpaceDashboardIcon/>
        },{
          path:'/requests_queue',
          label: 'Requests Queue', 
          icon: <ViewListIcon/>
        },{
          path:'/invoices',
          label: 'Invoices',
           icon: <ReceiptLongIcon/>
        }
      ])
      break;
  
    default:
      setLinks([])
      break;
  }
  },[user])
  const getUser = useCallback(async () => {
    // await fetch api call for current_user data
    
    const result = await fetch("/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    //await promise results.json() 
    const data = await result.json();
    setUser(data.user);
    setIsLoaded(true)
    return console.log(data.user);
  }, [setUser]);
  
  useEffect(() => {
    
    getUser(); //call our  current user usecallback function 
  }, [getUser]);

  // callback function to do async fetch request. pass as prop to child component
  const handleSubmit = async (url, method, obj) => {
    const results = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: obj && JSON.stringify(obj),
    });
    const data = await results.json();
    console.log(data);
  };

  //on App load, query for current user, auto login if signed in, otherwise sign in first.

  const authorizedUser = useCallback(
    (role, userRole) => {
      if (role !== userRole) {
        alert(`Only authenticated ${role} allowed`);
        navigate("/");
      }
    },
    [navigate]
  );


  return (
    <div className="mainDiv">
      <NavBar user={user}/>
<Stack direction={'row'} spacing={2} >
  {!!user && !!token && isLoaded && <SideBar links={links}/>}
<Stack width={'100%'} height={'90vh'}>
      <Routes>
        <Route path="/signin" element={<Signin user={user} setUser={setUser}  setIsLoaded={setIsLoaded} />}/>
        <Route path="/*" exact element={<Home user={user} handleSubmit={handleSubmit}  authorizedUser={authorizedUser}/>}/>
        <Route path="/signup" element={<Signup setUser={setUser} setIsLoaded={setIsLoaded}  />}/>
        <Route path="/signout" element={<Signout setUser={setUser} setIsLoaded={setIsLoaded} />} />
        <Route path="/request_rescue" element={!!token && isLoaded && <RequestRescue user={user}  handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/incident_reporting/*" element={!!token && isLoaded && <IncidentReporting user={user} handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/claims_tracking/*" element={!!token && isLoaded && <ClaimsTracking user={user} handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/invoices/*" element={!!token && isLoaded && <Invoices user={user} handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/requests_queue/*" element={!!token && isLoaded && <RequestsQueue  user={user} handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/reported_incidents/*" element={!!token && isLoaded && <IncidentsTracking  user={user} handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/claims_queue/*" element={!!token && isLoaded && <ClaimsQueue user={user} handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/assigned_incidents/*" element={!!token && isLoaded && <AssignedIncidents user={user} handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/assessments_tracking/*" element={!!token && isLoaded && <AssessmentTracking user={user} handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/assessments_reporting/*" element={!!token && isLoaded && <AssessmentReporting user={user} handleSubmit={handleSubmit} authorizedUser={authorizedUser}/>} />
        <Route path="/user_management/*" element={!!user && <UsersDashboard handleSubmit={handleSubmit} user={user} authorizedUser={authorizedUser}/>} />
        


      </Routes></Stack>
</Stack>
    </div>
  );
}

// import React, { useState} from 'react'
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import Home from "./components/Home.js"
// import LandingPage from "./components/LandingPage.js"
// import Signin from "./components/Signin.js"
// import Signup from "./components/Signup.js"
// import NavBar from "./components/NavBar.js"
// import Profile from "./components/Profile.js"
// import UpdateProfile from "./components/UpdateProfile.js"
// import DeleteProfile from "./components/DeleteProfile.js"
// import SetLocation from './components/SetLocation.js';
// import ManageUsers from "./components/ManageUsers.js"
// import ManageRequests from "./components/ManageRequests.js"
// import ManageServices from "./components/ManageServices.js"
// import Reports from "./components/Reports.js"
// import Tickets from "./components/Tickets.js"
// import MakeRequest from "./components/MakeRequest.js"
// import ViewRequest from "./components/ViewRequest.js"
// import NearbyResponders from "./components/NearbyResponders.js"
// import Communication from "./components/Communication.js"
// import EmergencySoS from "./components/EmergencySoS.js"
// import PaymentIntegration from "./components/PaymentIntegration.js"
// import AvailabilityStatus from "./components/AvailabilityStatus.js"
// import IncidentReporting from "./components/IncidentReporting.js"
// import JobsList from "./components/JobsList.js"
// import './assets/styles/mystyles.css'

// function App() {
//   const [user, setUser] = useState({})
//   const [isLoggedIn, setIsLoggedIn] = useState(false)

//   return (
//     <Router>
//     <NavBar user={user} isLoggedIn={isLoggedIn}/>
//     <Routes>
//     <Route path='/' element={<Home  setUser= {setUser}/>}/>
//     <Route path='/signin' element={<Signin setUser ={setUser} setIsLoggedIn={setIsLoggedIn} />}/>
//     <Route path="/profile" element={<Profile user = {user} />}/>
//     <Route path="/signup" element={<Signup setUser= {setUser} setIsLoggedIn={setIsLoggedIn}  />}/>
//     <Route path="/updateProfile" element={<UpdateProfile user = {user} />}/>
//     <Route path="/deleteProfile" element={<DeleteProfile user = {user}/>}/>
//     <Route path="/manageUsers" element= {<ManageUsers user={user} />} />
//     <Route path="/manageRequests" element= {<ManageRequests user={user} />} />
//     <Route path="/manageServices" element= {<ManageServices user={user} />} />
//     <Route path="/reports" element= {<Reports user={user} />} />
//     <Route path="/tickets" element= {<Tickets user={user} />} />
//     <Route path='/setLocation' element={<SetLocation user={user}/>}/>
//     <Route path="/makeRequest" element= {<MakeRequest user={user} />} />
//     <Route path="/nearbyResponders" element= {<NearbyResponders user={user} />} />
//     <Route path="/communication" element= {<Communication user={user} />} />
//     <Route path="/manageRequests" element= {<ManageRequests user={user} />} />
//     <Route path="/paymentIntegration" element= {<PaymentIntegration user={user} />} />
//     <Route path="/emergencySoS" element= {<EmergencySoS user={user} />} />
//     <Route path="/status" element= {<AvailabilityStatus user={user} />} />
//     <Route path="/viewRequest" element= {<ViewRequest user={user} />} />
//     <Route path="/incidentReporting" element= {<IncidentReporting user={user} />} />
//     <Route path="/jobslist" element= {<JobsList user={user} />} />
//     <Route path="/landingPage" element= {<LandingPage user={user} />} />

//     </Routes>
//   </Router>
//   );
// }

// export default App;

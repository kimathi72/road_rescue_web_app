import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/navigation/NavBar.js";
import Signin from "./components/auth/Signin.js";
import Signup from "./components/auth/Signup.js";
import Signout from "./components/auth/Signout.js";
import "./assets/styles/mystyles.css";
import Home from "./components/navigation/Home.js";
import RequestRescue from "./components/driver/RequestRescue.js";
import { Stack } from "@mui/material";
import SideBar from "./components/navigation/SideBar.js";
import IncidentReporting from "./components/driver/IncidentReporting.js";
import ClaimsTracking from "./components/driver/ClaimsTracking.js";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CarCrashIcon from '@mui/icons-material/CarCrash';
// import StreamIcon from '@mui/icons-material/Stream';
import SupportIcon from '@mui/icons-material/Support';
import FindInPageIcon from '@mui/icons-material/FindInPage';
// import CommuteIcon from '@mui/icons-material/Commute';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

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

  const authorized_user = useCallback(
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
  {!!user && isLoaded && <SideBar links={links}/>}
<Stack width={'100%'} height={'90vh'}>
      <Routes>
        <Route path="/signin" element={<Signin user={user} setUser={setUser}  setIsLoaded={setIsLoaded} />}/>
        <Route path="/*" exact element={<Home user={user} handleSubmit={handleSubmit}/>}/>
        <Route path="/signup" element={<Signup setUser={setUser} setIsLoaded={setIsLoaded}  />}/>
        <Route path="/signout" element={<Signout setUser={setUser} setIsLoaded={setIsLoaded} />} />
        <Route path="/request_rescue" element={<RequestRescue user={user}  handleSubmit={handleSubmit}/>} />
        <Route path="/incident_reporting" element={<IncidentReporting handleSubmit={handleSubmit} authorized_user={authorized_user}/>} />
        <Route path="/claims_tracking" element={<ClaimsTracking/>} />
        {/* <Route path="/request_rescue" element={<RequestRescue user={user}/>} />
        <Route path="/request_rescue" element={<RequestRescue user={user}/>} />
        <Route path="/request_rescue" element={<RequestRescue user={user}/>} />
        <Route path="/request_rescue" element={<RequestRescue user={user}/>} /> */}
        


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

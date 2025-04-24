import React , {useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/navigation/Home.js"
import NavBar from "./components/navigation/NavBar.js"
import Profile from "./components/auth/Profile.js"
import Signin from "./components/auth/Signin.js"
import Signup from "./components/auth/Signup.js" 
import Signout from "./components/auth/Signout.js" 
import DriverDashboard from './components/driver/DriverDashboard.js';
import AdminDashboard from './components/admin/AdminDashboard.js';
import AssessorDashboard from './components/assessor/AssessorDashboard.js';
import InsuranceDashboard from './components/insurance/InsuranceDashboard.js';


export default function App() {
const [user, setUser] = useState({})
const token = localStorage.getItem('jwt')
useEffect(()=>{
  if(token && !user){
    fetch('/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(r=>r.json()).then(data=>setUser(data))
  }
},[token, user])
  return (
    <Router>
      <NavBar user={user} />
      {console.log(token)}
      <Routes>
        <Route path='/driver' element={<DriverDashboard/>}/>
        <Route path='/admin' element={<AdminDashboard/>} />
        <Route path='/assessor' element={<AssessorDashboard/>} />
        <Route path='/insurer' element={<InsuranceDashboard/>} />
        <Route exact path='/' element={<Home user={user} />} />
        <Route path='/profile' element={<Profile user={user} />}/>
        <Route path='/signin' element={<Signin setUser={setUser}/>} />
        <Route path='/signup' element ={<Signup setUser={setUser}/>} /> 
        <Route path='/signout' element={<Signout setUser={setUser} />}/>
      </Routes>
    </Router>
  )
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


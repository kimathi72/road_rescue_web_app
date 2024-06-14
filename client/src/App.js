import React, { useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home.js"
import LandingPage from "./components/LandingPage.js"
import Signin from "./components/Signin.js"
import Signup from "./components/Signup.js"
import NavBar from "./components/NavBar.js"
import Profile from "./components/Profile.js"
import UpdateProfile from "./components/UpdateProfile.js"
import DeleteProfile from "./components/DeleteProfile.js"

import ManageUsers from "./components/ManageUsers.js"
import ManageRequests from "./components/ManageRequests.js"
import ManageServices from "./components/ManageServices.js"
import Reports from "./components/Reports.js"
import Tickets from "./components/Tickets.js"
import MakeRequest from "./components/MakeRequest.js"
import ViewRequest from "./components/ViewRequest.js" 
import NearbyResponders from "./components/NearbyResponders.js"
import Communication from "./components/Communication.js"
import EmergencySoS from "./components/EmergencySoS.js"
import PaymentIntegration from "./components/PaymentIntegration.js"
import AvailabilityStatus from "./components/AvailabilityStatus.js"
import IncidentReporting from "./components/IncidentReporting.js"
import JobsList from "./components/JobsList.js"
import './assets/styles/mystyles.css'

function App() {
  const [user, setUser] = useState({})

  return (
    <Router>
    <NavBar user={user}/>
    <Routes>
    <Route path='/' element={<Home  setUser= {setUser}/>}/> 
    <Route path='/signin' element={<Signin setUser ={setUser}/>}/> 
    <Route path="/profile" element={<Profile user = {user} />}/>  
    <Route path="/signup" element={<Signup setUser= {setUser} />}/> 
    <Route path="/updateProfile" element={<UpdateProfile user = {user} />}/>  
    <Route path="/deleteProfile" element={<DeleteProfile user = {user}/>}/>
    <Route path="/manageUsers" element= {<ManageUsers user={user} />} />
    <Route path="/manageRequests" element= {<ManageRequests user={user} />} />
    <Route path="/manageServices" element= {<ManageServices user={user} />} />
    <Route path="/reports" element= {<Reports user={user} />} />
    <Route path="/tickets" element= {<Tickets user={user} />} />
    <Route path="/makeRequest" element= {<MakeRequest user={user} />} />
    <Route path="/nearbyResponders" element= {<NearbyResponders user={user} />} />
    <Route path="/communication" element= {<Communication user={user} />} />
    <Route path="/manageRequests" element= {<ManageRequests user={user} />} />
    <Route path="/paymentIntegration" element= {<PaymentIntegration user={user} />} />
    <Route path="/emergencySoS" element= {<EmergencySoS user={user} />} />
    <Route path="/status" element= {<AvailabilityStatus user={user} />} />
    <Route path="/viewRequest" element= {<ViewRequest user={user} />} />
    <Route path="/incidentReporting" element= {<IncidentReporting user={user} />} />
    <Route path="/jobslist" element= {<JobsList user={user} />} />
    <Route path="/landingPage" element= {<LandingPage user={user} />} />

    </Routes>
  </Router>
  );
}

export default App;

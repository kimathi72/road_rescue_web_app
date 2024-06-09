import React, { useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home.js"
import Signin from "./components/Signin.js"
import Signup from "./components/Signup.js"
import NavBar from "./components/NavBar.js"
import ViewDriver from "./components/ViewDriver.js"
import UpdateDriver from "./components/UpdateDriver.js"
import DeleteDriver from "./components/DeleteDriver.js"
function App() {
  const [role, setRole] = useState("")
  const [user, setUser] = useState({})

  return (
    <Router>
    <NavBar/>
    <Routes>
    <Route path='/' element={<Home setRole ={setRole} setUser= {setUser}/>}/> 
    <Route path='/driver/signin' element={<Signin role ={role}/>}/> 
    <Route path="/driver/:id" element={<ViewDriver user = {user} />}/>  
    <Route path="/driver/create" element={<Signup role = {role} />}/> 
    <Route path="/driver/:id/update" element={<UpdateDriver user = {user} />}/>  
    <Route path="/driver/:id/destroy" element={<DeleteDriver user = {user}/>}/>
    </Routes>
  </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import AssessorDashBoard from "../assessor/AssessorDashboard.js"
import ProviderDashBoard from "../provider/ProviderDashBoard.js";
import DriverDashBoard from "../driver/DriverDashboard.js";
import AdminDashboard from "../admin/AdminDashboard.js";
import InsurerDashBoard from "../insurer/InsurerDashboard.js";
import { useNavigate } from "react-router-dom";

export default function Home({user, handleSubmit, authorizedUser}) {
  const navigate= useNavigate()
const [dashboard,setDashboard] = useState(<></>)
useEffect(()=>{
  switch (!!user && user.role) {
    case "driver":
      setDashboard(<DriverDashBoard user={user}  authorizedUser={authorizedUser} handleSubmit={handleSubmit}/>)
      break;
      case "admin":
      setDashboard(<AdminDashboard  user={user}  authorizedUser={authorizedUser}/>)
      break;
      case "insurer":
      setDashboard(<InsurerDashBoard  user={user} authorizedUser={authorizedUser}/>)
      break;
      case "provider":
      setDashboard(<ProviderDashBoard user={user}  authorizedUser={authorizedUser}/>)
      break;
      case "assessor":
      setDashboard(<AssessorDashBoard  user={user} authorizedUser={authorizedUser}/>)
      break;
  
    default:
      navigate('/signin')
      break;
  }
},[user,navigate,handleSubmit, authorizedUser])

  return (<>
    {dashboard}
    </>
  );
}

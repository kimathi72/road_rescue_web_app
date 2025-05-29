import React, { useEffect, useState } from "react";
import AssessorDashBoard from "../assessor/AssessorDashboard.js"
import ProviderDashBoard from "../provider/ProviderDashBoard.js";
import DriverDashBoard from "../driver/DriverDashboard.js";
import AdminDashboard from "../admin/AdminDashboard.js";
import InsurerDashBoard from "../insurer/InsurerDashboard.js";
import { useNavigate } from "react-router-dom";

export default function Home({user, handleSubmit}) {
  const navigate= useNavigate()
const [dashboard,setDashboard] = useState(<></>)
useEffect(()=>{
  switch (!!user && user.role) {
    case "driver":
      setDashboard(<DriverDashBoard user={user} handleSubmit={handleSubmit}/>)
      break;
      case "admin":
      setDashboard(<AdminDashboard/>)
      break;
      case "insurer":
      setDashboard(<InsurerDashBoard/>)
      break;
      case "provider":
      setDashboard(<ProviderDashBoard/>)
      break;
      case "assessor":
      setDashboard(<AssessorDashBoard/>)
      break;
  
    default:
      navigate('/signin')
      break;
  }
},[user,navigate,handleSubmit])

  return (<>
    {dashboard}
    </>
  );
}

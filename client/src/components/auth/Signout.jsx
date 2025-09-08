import React, { useCallback, useEffect} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export async function loader (){
  await fetch('api/logout',{
    method: "DELETE"
  })
  localStorage.clear()
}

export default function Signout({}) {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt')
  useLoaderData()
useEffect(()=>{
 !token && navigate("/signin"); 
},[token])
  return ( <div>Logging out...</div> )
}
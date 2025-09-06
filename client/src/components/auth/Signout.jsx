import React, { useCallback, useEffect} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchData } from "../../services/fetchData";

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
 !token && navigate("/"); 
},[token])
  return ( <div>Logging out...</div> )
}
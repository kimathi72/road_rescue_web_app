import React, { useCallback, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Signout({ setUser, setIsLoaded }) {
  const navigate = useNavigate();
  const logout = useCallback(()=>{
      fetch("/api/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(()=>{
        localStorage.clear();
      })      
  },[])
useEffect(()=>{
  setIsLoaded(false)
  logout()
  setUser(null); 
  navigate("/"); 
},[logout, navigate])
  return ( <div>Logging out...</div> )
}
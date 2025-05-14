import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function Signout({ setUser }) {
  const [isSignedOut,setIsSignedOut] = useState(false)
  const navigate = useNavigate();
  const logout = useCallback(async()=>{
      await fetch("/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(()=>{
        setUser(null);
        localStorage.clear();
        setIsSignedOut(true)
        navigate("/"); 
      })
      
      
  },[setUser,navigate])
  useEffect(() => {
    
    logout() 
    isSignedOut && <Alert severity="info">Sign out successfull</Alert>
      
  }, [logout ,isSignedOut]);

  return ( <div>Logging out...</div> )
}

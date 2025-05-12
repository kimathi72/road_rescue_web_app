import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signout({ setUser }) {
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
    navigate("/");
      })
      
  },[navigate,setUser])
  useEffect(() => {
    logout()
  }, [logout]);
  return <div>LogOut</div>;
}

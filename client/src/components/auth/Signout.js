import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signout({token, setUser}) {
  const navigate = useNavigate()
  useEffect(()=>{
    fetch('/logout',{
      headers: { 'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' },
      method: "DELETE", }).then(r=>r.json()).then(data=>{
        setUser(null)
        localStorage.clear() 
        navigate('/signin')
      })
  },[token, navigate, setUser])
  return (
    <div>LogOut</div>
  )
}

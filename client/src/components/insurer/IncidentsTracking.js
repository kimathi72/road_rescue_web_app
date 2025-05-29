import React, { useEffect } from 'react'

export default function IncidentsTracking({user,authorizedUser}) {
    useEffect(()=>{
           if (user) authorizedUser('insurer', user.role) 
        },[user, authorizedUser])
  return (
    <div>IncidentsTracking</div>
  )
}

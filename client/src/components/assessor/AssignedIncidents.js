import React, { useEffect } from 'react'

export default function AssignedIncidents({user, authorizedUser}) {
      useEffect(()=>{
        authorizedUser('assessor', user.role) 
    },[user, authorizedUser])
  return (
    <div>AssignedIncidents</div>
  )
}

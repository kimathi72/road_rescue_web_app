import React, { useEffect } from 'react'

export default function AssessmentTracking({user,authorizedUser}) {
    useEffect(()=>{
           if (user) authorizedUser('insurer', user.role) 
        },[user, authorizedUser])
  return (
    <div>AssessmentTracking</div>
  )
}

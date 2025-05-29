import React, { useEffect } from 'react'

export default function ProviderDashBoard({handleSubmit, user, authorizedUser }) {
    useEffect(()=>{
            authorizedUser('provider', user.role) 
        },[user, authorizedUser])
  return (
    <div>ProviderDashBoard</div>
  )
}

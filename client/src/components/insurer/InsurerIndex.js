import React, { useEffect } from 'react'

export default function InsurerIndex({user, authorized_user}) {
    useEffect(()=>{
        authorized_user('insurer', user.role) 
    },[user, authorized_user])
  return (
    <div>InsurerIndex</div>
  )
}

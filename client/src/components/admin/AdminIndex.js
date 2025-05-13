import React, { useEffect } from 'react'

export default function AdminIndex({user, authorized_user}) {
    useEffect(()=>{
        authorized_user('admin', user.role) 
    },[user, authorized_user])
  return (
    <div>AdminIndex</div>
  )
}

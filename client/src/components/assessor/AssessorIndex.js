import React, { useEffect } from 'react'

export default function AssessorIndex({user, authorized_user}) {
    useEffect(()=>{
        authorized_user('assessor', user.role) 
    },[user, authorized_user])
  return (
    <div>AssessorIndex</div>
  )
}

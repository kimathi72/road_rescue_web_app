import React from 'react'

export default function ResponderIndex({user, authorized_user}) {
    useEffect(()=>{
            authorized_user('provider', user.role) 
        },[user, authorized_user])
  return (
    <div>ResponderIndex</div>
  )
}

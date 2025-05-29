import React , {useEffect} from 'react'

export default function ClaimsQueue({user,authorizedUser}) {
    useEffect(()=>{
           if (user) authorizedUser('insurer', user.role) 
        },[user, authorizedUser])
  return (
    <div>ClaimsQueue</div>
  )
}

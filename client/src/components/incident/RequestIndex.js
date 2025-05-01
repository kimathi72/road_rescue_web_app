import React, { useEffect } from 'react'
import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'
import RequestForm from './RequestForm'
export default function RequestIndex({user}) {
    const {data: requests , isLoaded} = useQuery({url:"/requests", method:"GET"})
    useEffect(()=>{
      console.log(requests)
    },[requests])
  return (
    isLoaded && <div>
        <RequestForm  user={user}/> 
        <RequestsList requests={requests}/>
    </div>
  )
}

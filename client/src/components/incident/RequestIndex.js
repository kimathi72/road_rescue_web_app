import React, { useEffect } from 'react'
import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'
// import RequestForm from './RequestForm'
export default function RequestIndex({user}) {
    const {data: requests , isLoaded} = useQuery("/requests")
    useEffect(()=>{
      console.log(requests)
    },[requests])
  return (
     <div>
        {/* <RequestForm  user={user}/>  */}
        {isLoaded && <RequestsList requests={requests}/>}
    </div>
  )
}

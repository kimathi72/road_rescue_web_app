import React from 'react'

import RequestsList from './RequestsList'
import RequestForm from './RequestForm'

export default function RequestIndex({user}) {
  
  return (
     <div>
        <RequestForm  user={user}/> 
        <RequestsList />
    </div>
  )
}

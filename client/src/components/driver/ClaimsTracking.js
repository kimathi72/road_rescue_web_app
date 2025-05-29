import React from 'react'
import ClaimsList from '../claim/ClaimsList'
// import { Route, Routes } from 'react-router-dom'
// import ClaimsShow from '../claim/ClaimsShow'
// import ClaimCreate from '../claim/ClaimCreate'

export default function ClaimsTracking() {
  return (
    <ClaimsList />
    // <Routes>
    //     <Route path='/' exact element={<ClaimsList/>}/>
    //     <Route path='/:id' element={<ClaimsShow/>}/> 
    //     <Route path='/create' element={<ClaimCreate/>}/> 
    // </Routes>
  )
}

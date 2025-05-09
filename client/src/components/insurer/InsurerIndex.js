import React, { useEffect, useState } from 'react'
import ClaimsReview from './ClaimsReview'
import PolicyVerification from './PolicyVerification'
import ClaimsDashboard from './ClaimsDashboard'
import InsurerDashboard from './InsurerDashboard'
import useQuery from '../../hooks/useQuery'
import { Link, Route, Routes } from 'react-router-dom'

export default function InsurerIndex({user, authorized_user}) {
    const {data: results, isLoaded} = useQuery(`/insurers/${user.id}`)
    const [claims,setClaims] = useState(null)
    
    useEffect(()=>{

        authorized_user("insurer", user.role)
        if (isLoaded){
            setClaims(results.claims)
        }
    },[isLoaded, results, user, authorized_user])

  return (
    <div className='displayDiv'>
              <div className='sideBar'>
                <Link to={'/insurer/dashboard'}>Dashboard</Link>
                <Link to={'/insurer/claims_dashboard'}>Claims Dashboard</Link>
                <Link to={'/insurer/policy_verification'}>Policy Verification</Link>
                <Link to={'/insurer/claims_review'}>claims_review</Link>
              </div> <Routes>
                    <Route path='/claims_dashboard' element={<ClaimsDashboard claims={claims} />}/>
                    <Route path='/' exact element={<InsurerDashboard claims={claims} />}/>
                    <Route path='/dashboard' element={<InsurerDashboard claims={claims} />}/>
                    <Route path='/policy_verification' element={<PolicyVerification />}/>
                    <Route path='/claims_review' element={<ClaimsReview claims={claims} />}/>
                    
                </Routes> 
        </div>
  )
}

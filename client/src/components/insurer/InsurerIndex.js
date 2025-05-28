import React, { useEffect } from 'react'
import SideBar from '../navigation/SideBar'
import { Route, Routes } from 'react-router-dom'
import InsurerDashboard from './InsurerDashboard'
import ClaimsIndex from '../claim/ClaimsIndex'
import InvoiceIndex from '../invoice/InvoiceIndex'
import useQuery from '../../hooks/useQuery'
import Chat from '../chat/Chat'
export default function InsurerIndex({user, authorized_user}) {
   const {data: insurer, isLoaded} = useQuery(`/users/${user.id}`) 
  const links= [

         {url: '/insurer/dashboard',
          label:'Dashboard'},
         {url: '/insurer/claims',
          label:'Claim Dashboard'},
{url:'/insurer/invoices',
  label:'Invoices List'},
{url:'/insurer/chat',
  label:'Chat With Driver'}
    ]  
  useEffect(()=>{
       if (user) authorized_user('insurer', user.role) 
    },[user, authorized_user])
  return (
    <div className='innerDiv'>
      <SideBar links={links} />
      <div>
        {user && isLoaded && <Routes>
          <Route path='/chat/*' element={<Chat/>}/>
          <Route path='/' exact element={<InsurerDashboard user={insurer}/>}/>
          <Route path='/claims/*' element={<ClaimsIndex/>}/>
          <Route path='/invoices/*' element={<InvoiceIndex/>}/>
          <Route path='/dashboard' element={<InsurerDashboard/>}/>
          </Routes>}
      </div>
    </div>
  )
}

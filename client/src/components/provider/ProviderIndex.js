import React, {useEffect} from 'react'
import RequestIndex from '../request/RequestIndex'
import useQuery from '../../hooks/useQuery'
import SideBar from '../navigation/SideBar'
import { Route, Routes } from 'react-router-dom'
import ProviderDashBoard from './ProviderDashBoard'
import InvoiceIndex from '../invoice/InvoiceIndex'

export default function ProviderIndex({user, handleSubmit, authorized_user}) {
    const {data: provider, isLoaded} = useQuery(`/users/${user.id}`)
    const links= [
        {
            url: '/provider/dashboard',
            label:"Dashboard"
        },{
            url: '/provider/requests',
            label:"Requests"
        },{
            url: '/provider/invoices',
            label:"Invoices"
        },
    ]
    useEffect(()=>{
            authorized_user('provider', user.role) 
        },[user, authorized_user])
  return (
    <div className='innerDiv'>
        <SideBar links={links}/>
        <div>
            {
                user && isLoaded && <Routes>
                    <Route path='/' exact element={<ProviderDashBoard user={provider}/>}/>
                    <Route path='/dashboard' element={<ProviderDashBoard user={provider}/>}/>
                    <Route path='/requests/*' element={<RequestIndex user={provider} handleSubmit={handleSubmit}/>}/>
                    <Route path='/invoices' element={<InvoiceIndex handleSubmit={handleSubmit}/>}/>
                </Routes>
            }
        </div>
    </div>
  )
}

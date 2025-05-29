import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import InvoiceCreate from '../invoice/InvoiceCreate'
import InvoiceList from '../invoice/InvoiceList'

export default function Invoices({handleSubmit, user, authorizedUser }) {
    useEffect(()=>{
            authorizedUser('provider', user.role) 
        },[user, authorizedUser])
  return (
    <Routes>
        <Route path='/' element={<InvoiceList/>} />
        <Route path='/create' element={<InvoiceCreate/>} />
    </Routes>
  )
}

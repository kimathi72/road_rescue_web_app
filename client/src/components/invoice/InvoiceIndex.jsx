import React from 'react'
import useQuery from '../../hooks/useQuery'

export default function InvoiceIndex({user}) {
  const {data, isLoaded}= useQuery(`users/${user.id}/invoices/`)
  return (
    <div>InvoiceIndex
      
    </div>
  )
}

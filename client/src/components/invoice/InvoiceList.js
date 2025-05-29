import { Button } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function InvoiceList() {
     const location = useLocation()
      const {pathname} = location
  return (
    <div>
        <Button href={`${pathname}/create/`}>Create Invoice</Button>
    </div>
  )
}

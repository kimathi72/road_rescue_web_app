import { useParams } from 'react-router-dom'
import useQuery from '../../hooks/useQuery';
import TableCustomized from '../util/TableCustomized';
import { Button, Grid } from '@mui/material';
import InvoiceCreate from './InvoiceCreate';
import { useContext, useEffect, useState } from 'react';
import { CableContext } from '../../context/cable';

export default function InvoiceShow({role}) {
      const params = useParams()
      const invoiceId = params.id 
      const [invoices,setInvoices]= useState([])
      const {data: invoiceItems, isLoaded} = useQuery(`/invoices/${invoiceId}/invoice_items`)
      useEffect(()=>{
        !isLoaded ? null: !!isLoaded && setInvoices(invoiceItems)
      },[isLoaded,invoiceItems])
      const cableContext = useContext(CableContext);
      useEffect(()=>{
        const newChannel = cableContext.cable.subscriptions.create(
          {
            channel: "InvoiceChannel",
            invoice_id: !!invoiceId && invoiceId
          }, 
          {
            received: (data) => {
              console.log(data)
              return setInvoices([...invoices, data])
            }
          }
        )
      },[cableContext, invoices ])
  return (
    <Grid container direction={'column'} gap={'2rem'}>
        <Grid container direction={'column'} gap={'1rem'}>
        <h6>invoice items List</h6>
        {!!isLoaded ? !!(invoices.length > 0) ? <TableCustomized rows={invoices}/>: <p>no items added yet</p> : <p>fetching invoice</p>}

        </Grid>
        {!!role && role === "provider" && <InvoiceCreate invoiceId={invoiceId}/>}
        {!!role && role === "driver" && <Button>Pay now</Button>}
    </Grid>
  )
}

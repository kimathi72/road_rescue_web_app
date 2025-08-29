import { useParams } from 'react-router-dom'
import useQuery from '../../hooks/useQuery';
import TableCustomized from '../util/TableCustomized';
import { Grid } from '@mui/material';
import InvoiceCreate from './InvoiceCreate';

export default function InvoiceShow({role}) {
      const params = useParams()
      const invoiceId = params.id 
      const {data: invoiceItems, isLoaded} = useQuery(`/invoices/${invoiceId}/invoice_items`)

  return (
    <Grid container direction={'column'}>
        <Grid container direction={'column'}>
        <h6>invoice items List</h6>
        {!!isLoaded ? !!(invoiceItems.length > 0) ? <TableCustomized rows={invoiceItems}/>: <p>no items added yet</p> : <p>fetching invoice</p>}

        </Grid>
        {!!role && role === "provider" && <InvoiceCreate invoiceId={invoiceId}/>}
    </Grid>
  )
}

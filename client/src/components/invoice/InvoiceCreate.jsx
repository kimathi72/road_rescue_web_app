import { Grid , Box, FormControl, InputLabel, TextField, Input, Button} from '@mui/material'
import React, { useEffect } from 'react'

export default function InvoiceCreate({invoiceId}) {
  const [item,setItem] = useState({})
  useEffect(()=>{
    setItem(prev => ({...prev, "invoice_id": invoiceId}))
  },[invoiceId])
  const handleSubmit = async(e)=> {
    e.preventDefault()
    const res = await fetch('/invoice_items', {
      method:"POST", 
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({"invoice_item": item})

    })
  }
  return (
    <Grid container>
    <form onSubmit={handleSubmit}>

   <FormControl>
    <InputLabel>add invoice item</InputLabel>
    <Input type='number'
     onChange={(e)=>{setItem((prev)=>({...prev, "quantity": e.target.value})) }} 
     placeholder='quantity'/>
    <TextField type='text' placeholder='description' onChange={(e)=>{setItem((prev)=>({...prev, "description": e.target.value})) }} />
    <TextField type='number' placeholder='cost' onChange={(e)=>{setItem((prev)=>({...prev, "cost": e.target.value})) }} />
    <Button type='submit' startIcon={<AddIcon/>}>add</Button>
   </FormControl>
    </form>
    </Grid>
  )
}

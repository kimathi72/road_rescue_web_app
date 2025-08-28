import {Button, Grid } from '@mui/material'
import RequestPreview from './RequestPreview';
import { useEffect, useState } from 'react';
import TableCustomized from '../util/TableCustomized';


export default function RequestsList({requests, title}) {
  const [tableData, setTableData] = useState([])
  useEffect(()=>{
        !!requests && console.log(requests)
        setTableData(requests.map(request=>{
          const {vehicle,service, location, user, chat, invoice, created_at, ...rest} = request
          return {...rest,
            "vehicle_make_model": `${vehicle.make , vehicle.model}`,
            "location": location.city,
            "created": new Date(created_at).toLocaleString(),
            "view": <Button href={`/requests/${request.id}`}>view Request</Button>
            }
        }))
  },[requests])
  return (
    <Grid container direction={'column'} textAlign={'center'}>

      <h3 className={'pageTitle'}>{title}</h3>
      {/* <ul>
    {
      !!requests && requests.length > 0 ? requests.map((request,index)=>{
        return <RequestPreview key={index} request={request}/>
      }) : !!requests && !requests.length ? <RequestPreview request={requests}/>: <p>No Rescue Requests found.</p>

      }</ul> */}
      {requests.length > 0 ? <TableCustomized rows={tableData}/>: <p>No requests yet</p>}
      </Grid>
  )
}

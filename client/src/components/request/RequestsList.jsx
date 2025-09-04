import {Button, Grid } from '@mui/material'
import RequestPreview from './RequestPreview';
import { useEffect, useState } from 'react';
import TableCustomized from '../util/TableCustomized';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function RequestsList({requests, title}) {
  const [tableData, setTableData] = useState([])
  useEffect(()=>{
        !!requests && console.log(requests)
        setTableData(requests.map(request=>{
          const {vehicle,service,id, status,location, provider, chat, invoice, created_at, ...rest} = request
          return {"index": id,
            "issue": service.name
            ,"vehicle": `${vehicle.make} ${ vehicle.model}`,
            "status": status,            
            "location": !!location && location.district || <WarningAmberIcon fontSize='small'/>,
            "provider availability": !!provider ? provider.availability_status : <Box sx={{ display: 'flex' , flexDirection:"column", alignItems:"center"}}>
      <CircularProgress size="0.5rem"/>
      <small>waiting for provider</small>
    </Box>,
            "created": new Date(created_at).toLocaleString(),
            "view": <Button href={`/requests/${request.id}`}>view</Button>
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

import {Stack } from '@mui/material'
import RequestPreview from './RequestPreview';
import { useEffect } from 'react';


export default function RequestsList({requests, title}) {
  useEffect(()=>{
        !!requests && console.log(requests)

  },[requests])
  return (
    <Stack direction={'column'} textAlign={'center'}>

      <h3 className={'pageTitle'}>{title}</h3>
      <ul>
    {
      !!requests && requests.length > 0 ? requests.map((request,index)=>{
        return <RequestPreview key={index} request={request}/>
      }) : !!requests && !requests.length ? <RequestPreview request={requests}/>: <p>No Rescue Requests found.</p>

      }</ul></Stack>
  )
}

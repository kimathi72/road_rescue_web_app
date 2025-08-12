import {Stack } from '@mui/material'
import RequestPreview from './RequestPreview';


export default function RequestsList(requests) {
  
  return (
    <Stack direction={'column'} textAlign={'center'}>

      <h3 className={'pageTitle'}>Requests List</h3>
      <ul>
    {
      !!requests && requests.length > 0 ? requests.map((request,index)=>{
        return <RequestPreview key={index} request={request}/>
      }) : <p>No Rescue Requests found.</p>

      }</ul></Stack>
  )
}

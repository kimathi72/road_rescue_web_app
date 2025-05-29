import React, {useState, useEffect} from 'react'
import useQuery from '../../hooks/useQuery'
import TableCustomized from '../util/TableCustomized'
import { Button, Stack } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function RequestsList() {
  const {data: requests, isLoaded} = useQuery('/requests')
  const [tableContent, setTableContent] = useState([])
    useEffect(()=>{
      isLoaded && setTableContent(requests.map(request=>{
         return {...request, actions:  <Button href={`/${request.id}`} startIcon={<VisibilityIcon/>}>view</Button>}
      }))
    },[requests,isLoaded])
  return (
    <Stack direction={'column'} textAlign={'center'}>
      <h3 style={{ textAlign: "center", color: "green" }}>Queued Requests</h3>
    {
      isLoaded && requests.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Rescue Requests found.</p>
      }</Stack>
  )
}

import React, {useState, useEffect} from 'react'
import TableCustomized from '../util/TableCustomized'
import { Button, Stack } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation } from 'react-router-dom';


export default function RequestsList(user,requests, isLoaded) {
  const location = useLocation()
  const {pathname} = location 
  
  const [tableContent, setTableContent] = useState([])
    useEffect(()=>{
      isLoaded && setTableContent(requests.map(request=>{
         return {...request, actions:  <Button href={`${pathname}/${request.id}`} startIcon={<VisibilityIcon/>}>view</Button>}
      }))
    },[requests,pathname, isLoaded])
  return (
    <Stack direction={'column'} textAlign={'center'}>
      {!!user && user.role === "driver" && (
          <Button
            href={`/${pathname}/create`}
            color={"success"}
            startIcon={<VisibilityIcon />}
          >
            Add Rescue Request
          </Button>
        )}
      <h3 style={{ textAlign: "center", color: "green" }}>Queued Requests</h3>
    {
      isLoaded && requests.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Rescue Requests found.</p>
      }</Stack>
  )
}

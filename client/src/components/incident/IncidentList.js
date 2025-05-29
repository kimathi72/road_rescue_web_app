import React, { useEffect, useState } from 'react'
import TableCustomized from '../util/TableCustomized'
import {Stack , Button} from '@mui/material'
import useQuery from '../../hooks/useQuery'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation } from 'react-router-dom'
export default function IncidentList({user}) {
  const {data: incidents, isLoaded} = useQuery('/incidents')
  const [tableContent, setTableContent] = useState([])
  const location = useLocation()
  const {pathname} = location
  useEffect(()=>{
    isLoaded && setTableContent(incidents.map(incident=>{
      const {incident_photos, claim, ...rest} = incident
       return {...rest, actions: <Stack direction={'row'} spacing={1}>
<Button href={`${pathname}/${incident.id}`} color={'info'} startIcon={<VisibilityIcon/>}>view</Button>
       </Stack>}
    }))
  },[incidents,pathname,isLoaded])
  return (
    <Stack direction={'column'} textAlign={'center'} >
      <Stack direction={'column'}>
        <h3 style={{ textAlign: "center", color: "green" }}>Reported Incidents</h3>
        <Button href={`/${pathname}/create`} color={'success'} startIcon={<VisibilityIcon/>}>Add Incident</Button>
        </Stack>
        {
          isLoaded ? tableContent.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Incidents found</p> : <p>fetching incidents</p>
        }
        
    </Stack>
  )
}

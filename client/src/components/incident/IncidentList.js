import React, { useEffect, useState } from 'react'
import UploadFiles from './UploadFiles.js'
import TableCustomized from '../util/TableCustomized'
import {Stack } from '@mui/material'
import useQuery from '../../hooks/useQuery'

export default function IncidentList({user}) {
  const {data: incidents, isLoaded} = useQuery('/incidents')
  const [tableContent, setTableContent] = useState([])
  useEffect(()=>{
    isLoaded && setTableContent(incidents.map(incident=>{
      const {incident_photos, claim, ...rest} = incident
       return {...rest, actions: <Stack direction={'row'} spacing={1}>
       <UploadFiles color="secondary" label={'police abstract'}/>
       <UploadFiles  color="warning" label={'incident photos '}/>
       
       </Stack>}
    }))
  },[incidents,isLoaded])
  return (
    <Stack direction={'column'} textAlign={'center'} >
        <h3 style={{ textAlign: "center", color: "green" }}>Reported Incidents</h3>
        
        {
          isLoaded ? tableContent.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Incidents found</p> : <p>fetching incidents</p>
        }
        
    </Stack>
  )
}

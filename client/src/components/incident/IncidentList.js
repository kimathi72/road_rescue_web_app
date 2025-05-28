import React, { useEffect, useState } from 'react'
// import IncidentPreview from './IncidentPreview'
// import { Stack } from '@mui/material'
import TableCustomized from '../util/TableCustomized'
import {Link } from '@mui/material'
import { useLocation } from 'react-router-dom'

export default function IncidentList({user, incidents}) {
  const location = useLocation()
  const {pathname} = location
  const [tableContent, setTableContent] = useState([])
  useEffect(()=>{
    setTableContent(incidents.map(incident=>{
      const {vehicle, location, requests,claims,incident_photos,...rest } = incident 
       return {...rest, actions: <>
       <Link href={`${pathname}/${rest.id}`}>view</Link>
       </>}
    }))
  },[incidents, user, pathname])
  return (
    <div>
        <h2>Reported Incidents</h2>
        <TableCustomized rows={tableContent}/>
        {/* <Stack direction={'column'}spacing={2}>
{
            incidents && incidents.length ? incidents.map((incident,index) => {
                return <IncidentPreview key={index} incident={incident}/>
            } ) : <p>No incident reported yet</p>
        }
        </Stack> */}
        
    </div>
  )
}

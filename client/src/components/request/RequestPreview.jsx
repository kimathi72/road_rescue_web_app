import { Card, Typography, CardActions, CardContent } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function RequestPreview({request}) {
  const dateCreated = new Date(!!request && request["created_at"]).toLocaleString();
  return (
    !!request && <Card sx={{display: 'flex', flexDirection: 'column', mb: 1, width:'40rem'}}>
      <CardContent sx={{display: 'flex',justifyContent: 'space-around', color: 'black', fontSize: 14}} >
         <Typography variant='body2'>
       Location: {request.location.district}, {request.location.city}
      </Typography>
      <Typography variant='body2'>
        Status: {request['status']}
        </Typography>
      </CardContent>
       <CardContent sx={{textAlign: "center"}}>
     
      <Typography variant="h5" component="div">
       Issue: {request.service.name}
      </Typography>
      <Typography sx={{ color: 'lightcoral', mb: 1.5 }}>Vehicle: {request.vehicle['plate_number']}, {request.vehicle['make']}  {request.vehicle['model']} </Typography>
      <Typography variant="body2" >
        created at: {dateCreated}        
      </Typography>
    </CardContent>
    <CardActions sx={{color: "success", a:{color:'royalblue'}, justifyContent:'center'}}>
      <Link to={`/requests/${request.id}`} > View Request Details</Link>
    </CardActions>
    </Card>
  )
}

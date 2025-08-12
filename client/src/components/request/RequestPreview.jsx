import { Card, Typography, CardActions, CardContent } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function RequestPreview({request}) {
  
  return (
    <Card>
       <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
       Location: {request.location.city}
      </Typography>
      <Typography variant="h5" component="div">
       Issue: {request.service.name}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Vehicle: {request.vehicle['plate_number']}</Typography>
      <Typography variant="body2">
        Status: {request['status']}
        <br />
        created at: {request['created_at']}
        
      </Typography>
    </CardContent>
    <CardActions>
      <Link to={`/request/${request.id}`} > View Request Details</Link>
    </CardActions>
    </Card>
  )
}

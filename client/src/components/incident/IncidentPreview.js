import { Card, CardActions, CardContent, CardHeader, Link, Typography } from '@mui/material'
import React from 'react'

export default function IncidentPreview({incident}) {
    const {vehicle,location,driver, ...rest} = incident
return(<Card>
<CardHeader
title= {vehicle['plate_number']}
subheader={`Location: ${location['city']} - happened on: ${rest['date_happened']}` }
/>
<CardContent>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {rest['description']}
    </Typography>
</CardContent>
  <CardActions>
    <Link href='/requests' variant='body2'>Requests </Link>
    <Link href='/claims' variant='body2'>claims </Link>
    </CardActions>  
</Card>  )
}

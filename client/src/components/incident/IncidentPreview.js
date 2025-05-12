import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
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
        {rest['description'].slice(20)}
    </Typography>
</CardContent>
  <CardActions>
    <Button size='small'>view details</Button>

    </CardActions>  
</Card>  )
}

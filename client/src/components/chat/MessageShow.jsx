import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function MessageShow({message, user}) {
  return (
    !!message && <Card className={!!user && (user.id === message.user.id) ? "sent" : "received"}>
      <CardContent >
        <Typography variant='subtitle2' sx={{color: "text.secondary",textAlign: "left"}}><ContactPageIcon fontSize='small' sx={{verticalAlign:"middle", mr: 1}}/> {message.user.name || message.user.email}</Typography>
        <Typography gutterBottom variant='body1' >{message.content}</Typography>
        <Typography variant='caption'><DoneAllIcon fontSize='small'/> {new Date(!!message && message['created_at']).toLocaleString()}</Typography>
      </CardContent>
    </Card>
  )
}

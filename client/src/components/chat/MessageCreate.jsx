import { Button, FormControl,  TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

export default function MessageCreate({chatId}) {
    const token = localStorage.getItem('jwt')
    const [message,setMessage] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        !!chatId && setMessage((prev)=>({...prev, "chat_id": chatId}))
    },[chatId])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(message)
        const res = await fetch('/api/messages/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "message": message
            })
        })
        const data = await res.json()
        console.log(data)
        navigate(`/chat/${chatId}`)
    }
  return (
   <form style={{ margin: "1rem"}} onSubmit={handleSubmit}>
    <FormControl fullWidth sx={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-around", gap: "0.5rem"}}>
<TextField
label="Enter message"
multiline
fullWidth
maxRows={4} 
onChange={(e)=>setMessage({...message, "content": e.target.value})}
/>
    <Button type='submit' variant='contained' startIcon={<ForwardToInboxIcon/>} > Send </Button>
    </FormControl>
    

   </form> 
)
}

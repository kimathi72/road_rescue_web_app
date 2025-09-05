import { Button, FormControl,  TextField } from '@mui/material'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Form, useParams } from 'react-router-dom';

export default function MessageCreate({userId}) {
    const {chatId} = useParams()
  return (
   <Form style={{ margin: "1rem"}} method="post">
    <FormControl fullWidth sx={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-around", gap: "0.5rem"}}>
<TextField
id='contentInput'
label="Enter message"
name = "content"
multiline
fullWidth
maxRows={4} 
/>
<input type='hidden' name='user_id' value={userId}/>
<input type='hidden' name='chat_id' value={chatId}/>
    <Button type='submit' variant='contained' startIcon={<ForwardToInboxIcon/>} > Send </Button>
    </FormControl>
    

   </Form> 
)
}

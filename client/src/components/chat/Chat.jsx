
import { Grid } from '@mui/material'
import MessageList from './MessageList'
import MessageCreate from './MessageCreate'
import { useParams } from 'react-router-dom'
export default function Chat({user}) {

const params = useParams()
const chatId = params.id

  return (
    <Grid container direction={'column'} size={{xs:12, md:6, lg:8}}  sx={{boxShadow: "2px 2px 2px 2px #888888",backgroundColor: "AppWorkspace", borderRadius: "5px"}}>
      <h3 className='pageTitle'>Chat - Messages</h3>
        <MessageList chatId={chatId} user={user} />
        <MessageCreate chatId={chatId}/>
    </Grid>
  )
}

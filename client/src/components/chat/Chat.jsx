
import { Grid } from '@mui/material'
import MessageList from './MessageList'
import MessageCreate from './MessageCreate'
import { useParams } from 'react-router-dom'
export default function Chat({user}) {

const params = useParams()
const chatId = params.id

  return (
    <Grid container direction={'column'} border={'1px solid black'}>
        <MessageList chatId={chatId} user={user} />
        <MessageCreate chatId={chatId}/>
    </Grid>
  )
}

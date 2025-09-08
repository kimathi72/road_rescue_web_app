
import { Grid } from '@mui/material'
import MessageList from './MessageList'
import MessageCreate from './MessageCreate'
import { useLoaderData} from 'react-router-dom'
import { fetchData } from '../../services/fetchData'

export async function loader ({params}){
  const {chatId} = params
  const {user} = await fetchData({
    url: "/api/me",
    method: "GET"
  })
  const messages = await fetchData({
    url: `/api/chats/${!!chatId && chatId}/messages`,
    method: "GET",
  })
  return {messages, user}
}
export async function action ({request,params}){
  const formData = await request.formData()
  const updates = Object.fromEntries(formData);
  const data = await fetchData({
    url: `/api/messages`,
    method: "POST",
    submittedData: {"message": updates}
  })
 let inputDiv =  document.getElementById('contentInput')
 inputDiv.value= ''
}

export default function Chat() {
const {messages, user} = useLoaderData()

  return (
    <Grid container direction={'column'} size={{xs:12, md:12, lg:8}}  sx={{boxShadow: "2px 2px 2px 2px #888888",backgroundColor: "AppWorkspace", borderRadius: "5px"}}>
      <h3 className='pageTitle'>Chat - Messages</h3>
        <MessageList chatMessages={!!messages?.length && messages} user={user} />
        <MessageCreate userId={user.id}/>
    </Grid>
  )
}

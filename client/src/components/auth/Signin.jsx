import { Form, redirect, useNavigate} from 'react-router-dom'
import { Button, Grid, TextField } from '@mui/material'
import { fetchData } from '../../services/fetchData'
import { useEffect } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'

export async function action({request, params}){
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
   const data = await fetchData({
    url: '/api/auth',
    method: "POST",
    submittedData: {user: updates}
  })
   !!data && ("jwt" in data) && localStorage.setItem("jwt", data.jwt)
   
}

export default function Signin() {
  useDocumentTitle('Road Rescue - Signin')
  const token = localStorage.getItem('jwt')
  const navigate = useNavigate()
  useEffect(()=>{
!!token && navigate('/')
  },[
token
  ])

  return (
    <Grid container size={{xs: 12, md: 12, lg:8}} minWidth={'60vw'} direction={'column'} justifyContent={'center'} alignItems={'center'} gap={'1rem'}>
      <h2>{document.title}</h2>
      <h3 className='pageTitle'>Sign in with email</h3> 
    <Form method='post' id='signinForm'>
      <label>
        <span>Email</span>
        <TextField
        name='email'
        type='email'
        placeholder='enter email address'
        required
        />
        </label>
        <label>
          <span>Password</span>
        <TextField
        name='password'
        type='password'
        placeholder='enter password'
        required
        />
        </label>
        <Button fullWidth variant='contained' color='success' type='submit'>Sign In</Button>
      
    </Form> 
    
    </Grid>   
  )
}

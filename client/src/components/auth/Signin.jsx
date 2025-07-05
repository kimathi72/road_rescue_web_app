import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { Button, Stack, TextField } from '@mui/material'

export default function Signin({user,setUser,setIsLoaded}) {
  //create user email and password variables
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate =useNavigate() 
  useEffect(()=>{
    if (localStorage.getItem('jwt') && !!user) {
      setIsLoaded(true)
      switch (user.role) {
        case "driver":
          navigate ('/requests/create')
          break;
      
        default:
          navigate('/requests')
          break;
      }

    }
  },[user, setIsLoaded, navigate])

  //callback function set user authentication parameter 
  function handleAuthenticate(data) {    
    localStorage.setItem("jwt", data.jwt);  
    setUser(data.user);  
  }
  // event handling function, on the event on submit action, post form inputs to auth api
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/auth', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: {
          email: `${email}`,
          password: `${password}`          
        }
      })
    })
    .then((r)=>r.json())
    .then(handleAuthenticate)    
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3>Sign in with email</h3> 
      <Stack direction={'column'} spacing={2}>
        <TextField
        label='Email'
        type='email'
        placeholder='enter email address'
        onChange={(e) => setEmail(e.target.value) }
        />
        <TextField
        label='Password'
        type='password'
        placeholder='enter password'
        onChange={(e) => setPassword(e.target.value) }
        />
        <Button type='submit'>Sign In</Button>
      </Stack>
    </form>    
  )
}

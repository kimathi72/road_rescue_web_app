import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import Form from'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Signin({user,setUser, setIsLoaded}) {
  //create user email and password variables
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const navigate =useNavigate() 
  useEffect(()=>{
    if (user && localStorage.getItem('jwt')){
      navigate(`/`)
    }
  },[user, navigate])

  //callback function set user authentication parameter 
  function handleAuthenticate(data) {    
    localStorage.setItem("jwt", data.jwt);  
    setUser(data.user);  
    setIsLoaded(true)
    navigate(`/`)     
  }
  // event handling function, on the event on submit action, post form inputs to auth api
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/auth', {
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
    <Form className='authForm' onSubmit={handleSubmit}>
      <h3>Sign In As A  Here</h3>    
      <Form.Control type='email' placeholder='Enter email address' onChange={(e) => setEmail(e.target.value) }/>
      <Form.Control type='password' placeholder = 'Enter Password' onChange={(e) => setPassword(e.target.value) }/>
      <Button variant="success" type="submit">Sign In</Button>
      <Button onClick={()=> navigate('/signup')}>Don't have an account yet?</Button>
    </Form>    
  )
}

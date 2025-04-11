import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import Form from'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function Signup({setUser}) {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [passwordConfirmation , setPasswordConfirmation] = useState("")
  const navigate= useNavigate()

  function handleAuthenticate(data) {    
    localStorage.setItem("jwt", data.jwt);
    setUser(data.user); 
    navigate('/landingPage')    
  }

  function handleSubmit(e) {
    e.preventDefault()    
    fetch('/users', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user: {
          username: `${username}`,
          email: `${email}`,
          phone: `${phone}`,
          password: `${password}`, 
          password_confirmation: `${passwordConfirmation}`,
        }
      })
    }).then((r)=>r.json()).then(handleAuthenticate)    
  }

  return (
    <Form className='authForm' onSubmit={handleSubmit} >
      <h3>Sign Up as A Here</h3>
      <Form.Control type='text' placeholder='Enter Name' onChange={(e)=>{setUsername(e.target.value)}}/>
      <Form.Control type='email' placeholder='Enter email address' onChange={(e) => setEmail(e.target.value)}/>
      <Form.Control type="text" placeholder="phone, eg +254700000000" onChange={(e) => setPhone(e.target.value)}/>
      <Form.Control type='password' placeholder = 'Enter Password' onChange={(e) => setPassword(e.target.value)}/>
      <Form.Control type='password' placeholder = 'Enter Password Confirmation' onChange={(e) =>setPasswordConfirmation(e.target.value)}/>
      <Button variant="success" type="submit">Sign Up</Button>
      <Button onClick={()=> navigate('/signin')}>Already have an account?</Button>
    </Form>
  )
}

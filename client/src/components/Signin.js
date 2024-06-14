import React, { useState } from 'react'
import { useNavigate , useLocation} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Signin({ setUser}) {
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const location = useLocation()
  const role = location.state.role
  const navigate =useNavigate()
  function handleAuthenticate(data) {
    
    localStorage.setItem("jwt", data.jwt);
    console.log(data);
    setUser(data.user);  
    navigate('/landingPage', {state: {role: role}})

    
  }
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
    }).then((r)=>r.json()).then(handleAuthenticate)
    
  }

  return (
    <Container style={{display: "flex",flexDirection:"column", justifyContent:"center", alignItems:"center", backgroundImage:"url('https://img.freepik.com/free-photo/miserable-woman-crying-while-calling-help-mobile-phone-after-car-accident_637285-1089.jpg?w=1380&t=st=1710239385~exp=1710239985~hmac=28a46cc8b19492e63cf24d911fe7493d8f9b2779da47d07dda33683ad6acedaa')", backgroundSize:"cover", backgroundRepeat:"no-repeat", height:"100vh", margin:"auto", border: "2px solid black"}} >
    
    <Form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", height:"500px", margin:"auto", border:"2px solid black", padding:"2rem", backgroundImage: "linear-gradient(to bottom right , #8DA399, rgba(193, 240, 220, 0.61))"}}>
      <h3>Sign In As A {role} Here</h3>
    
      <Form.Control type='email' placeholder='Enter email address' onChange={(e) => setEmail(e.target.value) }/>
      <Form.Control type='password' placeholder = 'Enter Password' onChange={(e) => setPassword(e.target.value) }/>
      <Button variant="success" type="submit">Sign In</Button>
      <Button onClick={()=> navigate('/signup', {state: {role: role}})}>Don't have an account yet?</Button>
    </Form>
    </Container>
  )
}

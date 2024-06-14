import React, { useState } from 'react'
import { useNavigate , useLocation} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Signup({setUser}) {
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [passwordConfirmation , setPasswordConfirmation] = useState("")
  const location = useLocation()
  const role = location.state.role
  const navigate= useNavigate()
  function handleAuthenticate(data) {
    
    localStorage.setItem("jwt", data.jwt);
    console.log(data);
    setUser(data.user);  
    // const role = data.user.role 
    // if (!data[`${role}`]){
    //   navigate(`/${role}s/create`, {state: {id: user.id}}) 
    // }else {
    //   navigate("/home", {state: {role: role}});
    // }
    navigate('/landingPage', {state: {role: role}})
    
  }
  function handleSubmit(e) {
    e.preventDefault()    
    fetch('/users', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user: {
          email: `${email}`,
          password: `${password}`, 
          password_confirmation: `${passwordConfirmation}`,
          role: `${role}`
        }
      })
    }).then((r)=>r.json()).then(handleAuthenticate)
    
  }
  return (
    <Container style={{display: "flex",flexDirection:"column", justifyContent:"center", alignItems:"center", backgroundImage:"url('https://img.freepik.com/free-photo/young-couple-traveling-car-sunny-day_155003-16866.jpg?w=1380&t=st=1710239377~exp=1710239977~hmac=084bd39d343d9d1f3efa63586deb970023eb09198bb5fc3525b93d8919761d67')", backgroundSize:"cover", backgroundRepeat:"no-repeat", height:"100vh", margin:"auto", border: "2px solid black"}} >
    
  
      <Form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", height:"500px", margin:"auto", border:"2px solid black", padding:"2rem", backgroundImage: "linear-gradient(to bottom right , #8DA399, rgba(193, 240, 220, 0.61))"}}>
      <h3>Sign Up as A {role} Here</h3>
     
      <Form.Control type='email' placeholder='Enter email address' onChange={(e) => {
        console.log(email)
        setEmail(e.target.value)
      console.log(email)
      } }/>
      <Form.Control type='password' placeholder = 'Enter Password' onChange={(e) => {
        console.log(password)
        setPassword(e.target.value)
      console.log(password)
      } }/>
      <Form.Control type='password' placeholder = 'Enter Password Confirmation' onChange={(e) => {
        console.log(passwordConfirmation)
        setPasswordConfirmation(e.target.value)
        console.log(passwordConfirmation)
      }}/>
      
      <Button variant="success" type="submit">Sign Up</Button>
      
        <Button onClick={()=> navigate('/signin', {state: {role: role}})}>Already have an account?</Button>
    </Form>
    </Container>
  )
}

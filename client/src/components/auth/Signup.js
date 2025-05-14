import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function Signup({setUser, setIsLoaded}) {
  const [driverData, setData] = useState({type: "Driver"})
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

      try {
        const response = await fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({user: driverData}),
        });
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("jwt", data.jwt);
        setIsLoaded(true)
        return navigate(`/${data.user.role}`) ;
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleChange = (e)=>{
      const {name, value} = e.target
      setData((prevUser) => ({...prevUser, [name]: value}))
    }
return (
  <Form className='authForm' onSubmit={handleSubmit} >
    <h1> Sign Up {driverData.role}</h1>
    <Form.Control type='email' name='email' placeholder='Enter email address' onChange={handleChange}/>
    <Form.Control type="text" name="phone" placeholder="phone, eg +254700000000" onChange={handleChange}/>
    <Form.Control type='password' name="password" placeholder = 'Enter Password' onChange={handleChange}/>
    <Form.Control type='password' name="password_confirmation" placeholder = 'Enter Password Confirmation' onChange={handleChange}/>
    <Button variant="success" type="submit">Sign Up</Button>
    <Button onClick={()=> navigate('/signin')}>Already have an account?</Button>
  </Form>
)
}

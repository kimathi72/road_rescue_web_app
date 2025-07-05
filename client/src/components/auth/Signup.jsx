import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, TextField } from '@mui/material'

export default function Signup({setUser, setIsLoaded}) {
  const [driverData, setData] = useState({})
  const navigate = useNavigate();
  useEffect(()=>{
    setData((prev)=>({...prev, "role": "driver"}))
  },[])

  async function handleSubmit(e) {
    e.preventDefault();

      try {
        const response = await fetch("/api/users", {
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
        navigate(`/`) ;
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleChange = (e)=>{
      const {name, value} = e.target
      setData((prevUser) => ({...prevUser, [name]: value}))
    }
return (
  <form className='form' onSubmit={handleSubmit} >
    <h1> Driver Sign Up Here</h1>
    <Stack direction={'column'} spacing={2}>
     
      <TextField
    name="name"
    placeholder="enter full name"
    type="text"
    onChange={handleChange}
    />
    <TextField
    name="email"
    placeholder="enter email address"
    type="email"
    onChange={handleChange}
    />
    <TextField
    name="phone"
    placeholder="enter phone number +254XXXXXXXXX"
    type="text"
    onChange={handleChange}
    />
    <TextField
    name="password"
    placeholder="enter password"
    type="password"
    onChange={handleChange}
    />
    <TextField
    name="password_confirmation"
    placeholder="password confirmation"
    type="password"
    onChange={handleChange}
    />
    <Button type='submit' >Sign up</Button>
    </Stack>
  </form>
)
}

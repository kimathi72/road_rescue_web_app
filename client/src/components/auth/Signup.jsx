import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Stack, TextField } from '@mui/material'
import Select from '@mui/material/Select';

export default function Signup({setUser, setIsLoaded}) {
  const [userData, setData] = useState({})
  const navigate = useNavigate();
  useEffect(()=>{
    setData((prev)=>({...prev, "role": "driver"}))
  },[])

  async function handleSubmit(e) {
    e.preventDefault();
console.log(userData)
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({user: userData}),
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
     
    <FormControl>
      <label>choose a role</label>
    <select
          onChange={(event) => {
    setData(prev => ({...prev, "role": event.target.value}));
  }}>
      <option value={'driver'}>Driver</option>
      <option value={'provider'}>Provider</option>
    </select>
    </FormControl>
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
    <Link to='/signin'>Already have an account, sign in here</Link>
  </form>
)
}

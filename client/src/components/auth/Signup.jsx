import { Link, useNavigate , Form} from "react-router-dom";
import { Button, MenuItem, Grid, TextField } from '@mui/material'
import { fetchData } from "../../services/fetchData";
import { useEffect } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export async function action({request, params}){
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const data = await fetchData({
    url: '/api/users',
    method: "POST",
    submittedData: {user: updates}
  })
   !!data && ("jwt" in data) && localStorage.setItem("jwt", data.jwt)
}

export default function Signup() {
  useDocumentTitle('Road Rescue - Signup')
  const roles = ["Driver", "Provider"]
  const token = localStorage.getItem('jwt')
  const navigate = useNavigate();
  useEffect(()=>{
    !!token && navigate('/')
  },[token])

return (
  <Grid container size = {{xs:12, md: 12, lg:8}} minWidth={'60vw'} direction={'column'} justifyContent={'center'} alignItems={'center'} gap={'2rem'}>
    <h1>Create an account</h1>
  <Form method="post" id="signupForm" >
    
      <label>
        <span>Account Type</span>
        <TextField
        variant="standard"
        select
        defaultValue={'Driver'}
        helperText="Please select account type"
        name='type'
        required
        >
          {roles.map((r,i)=>{
            return <MenuItem key={i} value={r}>{r}</MenuItem>
          })}
        </TextField>
        </label>
    <label>
      <span>Full Name</span>
      <TextField
    name="name"
    placeholder="enter full name"
    type="text"
    required
    />
    </label>
      <label>
        <span>Email</span>
        <TextField
    name="email"
    placeholder="enter email address"
    type="email"
    required
    />
      </label>
    <label>
      <span>Password</span>
    <TextField
    name="password"
    placeholder="enter password"
    type="password"
    required
    />
    </label>
    <label>
      <span>
        Confirm Password 
      </span>
    <TextField
    name="password_confirmation"
    placeholder="password confirmation"
    type="password"
    required
    />
    </label>
    <Button variant="contained" color="success" fullWidth type='submit' >Sign up</Button>
  </Form>
  </Grid>
)
}

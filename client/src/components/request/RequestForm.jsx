import SetLocation from "../location/SetLocation.jsx";
import ManageServices from "../service/ManageServices.jsx";
import { Button, Input, Stack, TextField } from "@mui/material";

export default function RequestForm({setRequest, setIsSubmitted}) {
  
  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      setIsSubmitted(true)
    }} className="form">
      <Stack spacing={1}>
      
        <SetLocation setData={setRequest}/>
         <ManageServices/>

        <TextField name="vehicle" label="vehicle" placeholder="Make, Model, Color"/>

        <TextField
        fullWidth
        label="description"
          multiline
          onChange={e=>setRequest((prev)=>({...prev, "request_description": e.target.value}))}
          minRows={3}
          placeholder="Enter description"
        />
        
        </Stack>
      <Button variant="contained" color="error" type="submit">Request Road Rescue</Button>
    </form>
  );
}

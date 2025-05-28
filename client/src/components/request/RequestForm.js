import Button from "react-bootstrap/esm/Button";
import AutoComplete from "../util/AutoComplete";
import { Stack, TextField } from "@mui/material";

export default function RequestForm({setRequest, setIsSubmitted}) {
  
  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      setIsSubmitted(true)
    }} className="form">
      <Stack direction={"column"} spacing={2}>
      <h1>Request Road Rescue services</h1>
      <Stack direction={"row"} spacing={2}>
          <AutoComplete
            lb={"Select Vehicle"}
            setData={setRequest}
            url={"/vehicles"}
            k={"plate_number"}
          />
          
          <AutoComplete
            lb={"Choose Service"}
            url={"/services"}
            k={"name"}
            setData={setRequest}
          />
</Stack>

        <TextField
        label= "Additional notes: "
          multiline
          onChange={e=>setRequest((prev)=>({...prev, "request_description": e.target.value}))}
          minRows={3}
          placeholder="Enter description"
        />
        <Button type="submit">submit</Button>
        </Stack>
      
    </form>
  );
}

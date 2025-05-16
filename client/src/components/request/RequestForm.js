import Button from "react-bootstrap/esm/Button";
import AutoComplete from "../util/AutoComplete";
import { Stack, TextField } from "@mui/material";

export default function RequestForm({setRequest, setIsSubmitted}) {
  
  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      setIsSubmitted(true)
    }} className="form">
      <h1>Report New Incident</h1>
      <Stack direction={"row"} spacing={2}>
          <AutoComplete
            lb={"Vehicle Select"}
            callBackFn={setRequest}
            url={"/vehicles"}
            k={"plate_number"}
          />
          
          <AutoComplete
            lb={"Service Type"}
            url={"/services"}
            k={"name"}
            callBackFn={setRequest}
          />
          <AutoComplete
            lb={"Location Select"}
            callBackFn={setRequest}
            url={"/locations"}
            k={"city"}
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
    </form>
  );
}

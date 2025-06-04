import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { useEffect } from "react";
import ClaimCreate from "../claim/ClaimCreate";


export default function IncidentPreview() {
  const params = useParams()
  const id = params.id 
  const {data: incident, isLoaded}= useQuery(`/incidents/${!!id && id}`)
  const { claim, incident_photos, ...rest } = isLoaded && incident;
  useEffect(()=>{
    console.log(incident)
  },[incident])
  return (<>{
   isLoaded ? <Stack direction={"column"} spacing={2}>
      <Stack direction={"column"} spacing={0.5}>
        <Stack direction={"row"} justifyContent={'space-evenly'}>
            <small>location: {rest["city"]}</small>
            <small>date occured: {rest["date"]}</small>
            <small>status:<b style={{color:"primary"}}>{rest['status']}</b></small>
        </Stack>
        
        <Stack direction={"column"} spacing={2}>
          <h4>Vehicle Plate Number: {rest["vehicle_plate"].toUpperCase()} </h4>
          <p>Desciption: {rest["description"]}</p>
        </Stack>
        <ClaimCreate/>
      </Stack>
    </Stack> : <p>loading incident</p>}</>
  );
}

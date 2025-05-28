import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { useEffect } from "react";
import IncidentPhotos from "./IncidentPhotos";


export default function IncidentPreview() {
  const params = useParams()
  const id = params.id 
  const {data: incident, isLoaded}= useQuery(`/incidents/${!!id && id}`)
  const { vehicle, location, requests, claims, incident_photos, ...rest } = isLoaded && incident;
  useEffect(()=>{
    console.log(incident)
  },[incident])
  return (<>{
   isLoaded ? <Stack direction={"column"} spacing={2}>
      <Stack direction={"column"} spacing={0.5}>
        <Stack direction={"row"} spacing={4}>
            <small>location: {location["city"]}</small>
            <small>date occured: {new Date(
            `${rest["date_happened"]}`
          ).toLocaleString().split(',')[0]}</small>
        </Stack>
        
        <Stack direction={"row"} spacing={2}>
          <h6>{vehicle["plate_number"].toUpperCase()} </h6>
          <b>status: {rest['status']}</b>
        </Stack>
        <p>{rest["description"]}</p>
      </Stack>
      <Stack direction={"row"} spacing={1}>
        <IncidentPhotos/>
      </Stack>
    </Stack> : <p>loading incident</p>}</>
  );
}

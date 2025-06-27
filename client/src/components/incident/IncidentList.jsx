import { Stack} from "@mui/material";
import IncidentPreview from "./IncidentPreview";

export default function IncidentList({incidents , authorizedUser}) {
 
  return (
    <Stack direction={"column"} textAlign={"center"}>
      <Stack direction={"row"}>
        <h3 style={{ textAlign: "center", color: "green" }}>
          Reported Incidents
        </h3>
    
        
      </Stack>
        { incidents.length > 0 ? incidents.map((incident,index) => {
          return <IncidentPreview key={index} incident={incident}/>        
        }) : <p> no incident reported</p>}
    </Stack>
  );
}

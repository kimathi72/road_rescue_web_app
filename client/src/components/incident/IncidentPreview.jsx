import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";


export default function IncidentPreview({incident}) {
  
  return (
   <Card sx={{maxWidth: 345}}>
      <CardHeader
      title= {` ${ incident['city']}`}
      subheader={` ${ incident['date']}`}
      />
      <CardContent >
          <Typography gutterBottom variant="h2" component="div">{ incident["vehicle_plate"].toUpperCase()} </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}> { incident["description"]}</Typography>
          <Typography variant="small" sx={{ color: 'text.secondary' }}>status: { incident['status']}</Typography>
        
      </CardContent>
      <CardActions>
        <Button href={`/incidents/${incident.id}`}>view details</Button>
      </CardActions>
    </Card>
  );
}

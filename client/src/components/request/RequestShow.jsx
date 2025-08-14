import { Box, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import Map from "../location/Map";

export default function RequestShow({ user }) {
  const [action, setAction] = useState(<></>);
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const { data: request, isLoaded } = useQuery(`/requests/${id}`);
  const dateCreated = new Date(!!request && request["created_at"]).toLocaleString();
  useEffect(() => {
    switch (user.role) {
      case "driver":
        setAction(
          <Grid
            container 
            direction={"column"}
            justifyContent={"center"}
            gap={"0.5rem"}
          >
            {(!!request && !!request['invoice']) ? <Button
            onClick={()=>navigate(`/requests/${id}/invoice`)}
            >proceed to invoice</Button> 
            :(!!request && request['status'] ==='cancelled') ? 
              <Button onClick={()=>navigate(`/requests/${id}/edit`, {state: {"status": "reported"}})}>
                undo Cancellation
              </Button>: <Button
            onClick={() =>
                navigate(`/requests/${id}/edit`, { state: { "status": "cancelled"} })
              }
               variant="contained" color="error">
              Cancel Request
            </Button> }
            {
              (!!request && !!request['user']) ? <Button 
              onClick={()=>navigate(`/requests/${id}/chat`)}
               variant="contained">Chat with Provider</Button> : <Button onClick={()=>navigate('/nearby_providers')} variant="contained">View nearby Providers</Button>
            }
            
          </Grid>
        );

        break;
      case "provider":
        console.log(!!request && request);
        if (!!request && !!request["user"]) {
          setAction(
            <Grid
              container
              direction={"column"}
              justifyContent={"center"}
              gap={"0.5rem"}
            >
              <Button onClick={()=>navigate(`/requests/${id}/chat`)} variant="contained" color="success">
                Chat with Driver
              </Button>
              <Button onClick={()=>navigate(`/requests/${id}/invoice`)} variant="contained" color="primary">
                Proceed to Invoice
              </Button>
            </Grid>
          );
        } else if (!!request && !request["user"]) {
          setAction(
            <Grid
              container
              direction={"column"}
              justifyContent={"center"}
              gap={"0.5rem"}
            >
            
              <Button onClick={()=>navigate(`/requests/${id}/edit`, {state:{"user_id": user.id , "status": "accepted"}})} variant="contained" color="success">
                Accept Request
              </Button>
            </Grid>
          );
        }

        break;

      default:
        setAction(
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            gap={"0.5rem"}
          >
            <Button>Cancel Request</Button>
            <Button>Delete Request</Button>
          </Grid>
        );
        break;
    }
  }, [user]);
  return isLoaded ? (
    <Grid container direction={"column"} gap={"2rem"} justifyContent={"center"}>
      <h3 style={{ textAlign: "center" }}>Request Details</h3>
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <Grid container direction={"column"} justifyContent={"space-around"}>
          <Box>
            <p>
              Issue:{" "}
              <span style={{ fontSize: "large" }}>{request.service.name}</span>
            </p>
            <p>
              Vehicle: {request.vehicle["plate_number"]} -{" "}
              {request.vehicle["make"]} {request.vehicle["model"]}
            </p>
            <p>Details: {request["request_description"]} </p>
            <p>Location: {request.location.city}</p>
            <small>created at: {dateCreated}</small>
            
          </Box>
          <Box>
            <h4>Provider details</h4>
            {!!request["user"] ? (
              <Box>
                <p>email: {request.user.email} </p>
                <p>Phone: {request.user.phone}</p>
              </Box>
            ) : (
              <p>Waiting for provider response. </p>
            )}
          </Box>
        </Grid>
        <Grid
          container
          gap={"1rem"}
          direction={"column"}
          justifyContent={"center"}
        >
          <h4 style={{ textAlign: "center" }}>Live Location</h4>
          <Map
            position={[
              request["location"]["latitude"],
              request["location"]["longitude"],
            ]}
          />
        </Grid>
      </Grid>
      {action}
    </Grid>
  ) : (
    <p>Loading Request. . .</p>
  );
}

// RequestShow.jsx
import { Box, Button, Dialog, DialogTitle, Grid } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate, useParams, Form, redirect } from "react-router-dom";
import { CableContext } from "../../context/cable";
import { fetchData } from "../../services/fetchData";
import RequestMap from "./RequestMap";
import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import MapPicker from "../location/MapPicker.jsx";

export async function loader ({params}){
  const request = await fetchData({ url: `/api/requests/${params.id}`, method: "GET" });
  const {user} = await fetchData({ url: '/api/me', method: "GET" });
  return { request, user };
}
export async function action ({request,params}){
  const formData = await request.formData()
  const updates = Object.fromEntries(formData);
   if ('location_attributes' in updates && !!updates['location_attributes'].length) {
    updates['location_attributes'] =  JSON.parse(updates['location_attributes'])
  }
  const data = await fetchData({
    url: `/api/requests/${params.id}`,
    method: "PATCH",
    submittedData: {"request": updates},
  })
  !!data && redirect(`/requests/${params.id}`)
}

export default function RequestShow() {
  useDocumentTitle('Road Rescue - Request Details')
  const { request: initialRequest, user } = useLoaderData();
  const [request, setRequest] = useState(initialRequest);
  const [providerLocation, setProviderLocation] = useState(
    initialRequest.provider?.location
      ? [initialRequest.provider.location.latitude, initialRequest.provider.location.longitude]
      : null
  );
  const [routeInfo, setRouteInfo] = useState(null);
  const navigate = useNavigate()
  const { id } = useParams();
  const cableContext = useContext(CableContext);
  const cable = cableContext?.cable; // grab stable reference

  // Memoize coordinates so reference is stable between renders unless values change
  const requestCoords = useMemo(() => {
    if (!request?.location?.district) return null;
    return [
      Number(request.location.latitude),
      Number(request.location.longitude)
    ];
  }, [request?.location?.latitude, request?.location?.longitude]);

  const providerCoordsMemo = useMemo(() => {
    if (!providerLocation) return null;
    return [ Number(providerLocation[0]), Number(providerLocation[1]) ];
  }, [providerLocation?.[0], providerLocation?.[1]]);

  // Subscribe to live updates (guard on stable cable)
  useEffect(() => {
    // if (!id || !cable) return;

    const channel = cable.subscriptions.create(
      { channel: "RequestChannel", request_id: !!id && id },
      {
        received: (data) => {
          // Update request
          console.log(data)
          setRequest(data);

          // Update provider location if present (numeric)
          if (data.provider?.location) {
            setProviderLocation([
              Number(data.provider.location.latitude),
              Number(data.provider.location.longitude)
            ]);
          }
        }
      }
    );

    // return () => {
    //   if (channel && channel.unsubscribe) channel.unsubscribe();
    // };
  }, [cable]);
  const [open,setOpen]  = useState(false) 
  const handleClose = ()=> {
    setOpen(false)
  }
  const dateCreated = request?.created_at ? new Date(request.created_at).toLocaleString() : "";

  return request ? (
    <Grid container direction="column" gap="2rem" justifyContent="center">
      <h3 style={{ textAlign: "center" }}>Request Details</h3>

      <Grid container direction={{ xs: "column", md: "row" }} justifyContent="space-around">
        <Box>
          <p>Issue: <strong>{request.service?.name}</strong></p>
          <p>Vehicle: {request.vehicle?.plate_number} - {request.vehicle?.make} {request.vehicle?.model}</p>
          <p>Details: {request.request_description}</p>
          <p>Location: {request.location?.city || ((user?.type === "Driver") && (request?.vehicle?.driver?.id === user?.id) && <Button onClick={()=>setOpen(true)} color="warning" >add Location</Button>)}</p>
          <small>Created at: {dateCreated}</small>
        </Box>
        <Dialog open= {open} onClose={handleClose}>
            <DialogTitle>Set Request Location</DialogTitle>
            <Form method="patch">
              <MapPicker/> 
              <Button type='submit' fullWidth color="success" variant="contained" > submit new location</Button>
            </Form>
        </Dialog>
        <Box>
          <h4>Provider details</h4>
          {request.provider ? (
            <Box>
              <p>Email: {request.provider.email}</p>
              <p>Phone: {request.provider.phone}</p>
              <p>Location: {request.provider.location?.district}</p>
            </Box>
          ) : <p>Waiting for provider response.</p>}
        </Box>
      </Grid>

      <Grid container direction="column" gap="1rem" justifyContent="center">
        <h4 style={{ textAlign: "center" }}>Live Location</h4>

        <RequestMap
          requestLocation={requestCoords}
          providerLocation={providerCoordsMemo}
          onRouteInfo={setRouteInfo}
        />

        {routeInfo && (
          <p style={{ textAlign: "center" }}>
            Distance: {routeInfo.distanceKm} km — ETA: {routeInfo.etaMin} min
          </p>
        )}
      </Grid>

      {/* Example action buttons (keep existing logic) */}
      {!request?.provider && request?.status === "reported" && user?.type === "Provider" && (
        <Form method="patch">
          <input type="hidden" name="status" value={"accepted"} readOnly/>
          <input type="hidden" name="provider_id" value={user.id} readOnly/>
          <Button fullWidth color="success" type="submit">Accept Request</Button>
        </Form>
      )}
      {
        console.log(request)
      }
      {request?.provider && (
        <Button onClick={() => navigate(`/chats/${request.chat.id}`)} variant="contained">
          Chat with {user?.type === "Driver" ? "Provider" : "Driver"}
        </Button>
      )}

      {request?.invoice && (user?.type === "Provider") && (
        <Button variant="contained" fullWidth color="secondary" onClick={() => navigate(`/invoices/${request.invoice.id}`)}>Proceed to Invoice</Button>
      )}
    </Grid>
  ) : (
    <p>Loading Request…</p>
  );
}

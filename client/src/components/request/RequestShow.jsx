// RequestShow.jsx
import { Box, Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate, useParams, Form } from "react-router-dom";
import { CableContext } from "../../context/cable";
import { fetchData } from "../../services/fetchData";
import RequestMap from "./RequestMap";

export async function loader ({params}){
  const request = await fetchData({ url: `/api/requests/${params.id}`, method: "GET" });
  const user = await fetchData({ url: '/api/me', method: "GET" });
  return { request, user };
}

export default function RequestShow() {
  const { request: initialRequest, user } = useLoaderData();
  const [request, setRequest] = useState(initialRequest);
  const [providerLocation, setProviderLocation] = useState(
    initialRequest.provider?.location
      ? [initialRequest.provider.location.latitude, initialRequest.provider.location.longitude]
      : null
  );
  const [routeInfo, setRouteInfo] = useState(null);

  const { id } = useParams();
  const cableContext = useContext(CableContext);
  const cable = cableContext?.cable; // grab stable reference

  // Memoize coordinates so reference is stable between renders unless values change
  const requestCoords = useMemo(() => {
    if (!request?.location) return null;
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
    if (!id || !cable) return;

    const channel = cable.subscriptions.create(
      { channel: "RequestChannel", request_id: id },
      {
        received: (data) => {
          // Update request
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

    return () => {
      if (channel && channel.unsubscribe) channel.unsubscribe();
    };
  }, [cable, id]);

  const dateCreated = request?.created_at ? new Date(request.created_at).toLocaleString() : "";

  return request ? (
    <Grid container direction="column" gap="2rem" justifyContent="center">
      <h3 style={{ textAlign: "center" }}>Request Details</h3>

      <Grid container direction={{ xs: "column", md: "row" }} justifyContent="space-around">
        <Box>
          <p>Issue: <strong>{request.service?.name}</strong></p>
          <p>Vehicle: {request.vehicle?.plate_number} - {request.vehicle?.make} {request.vehicle?.model}</p>
          <p>Details: {request.request_description}</p>
          <p>Location: {request.location?.city}</p>
          <small>Created at: {dateCreated}</small>
        </Box>

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
      {request && request.status === "reported" && user.type === "Provider" && (
        <Form method="post" action={`/api/requests/${request.id}/accept`}>
          <Button type="submit">Accept</Button>
        </Form>
      )}

      {request?.provider && (
        <Button onClick={() => navigate(`/chat/${request.chat.id}`)} variant="contained">
          Chat with {user?.type === "Driver" ? "Provider" : "Driver"}
        </Button>
      )}

      {request?.invoice && (
        <Button onClick={() => navigate(`/invoices/${request.invoice.id}`)}>Proceed to Invoice</Button>
      )}
    </Grid>
  ) : (
    <p>Loading Request…</p>
  );
}

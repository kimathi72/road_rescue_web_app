// RequestShow.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  useLoaderData,
  useNavigate,
  useParams,
  Form,
  redirect,
} from "react-router-dom";
import { CableContext } from "../../context/cable";
import { fetchData } from "../../services/fetchData";
import RequestMap from "./RequestMap";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import MapPicker from "../location/MapPicker.jsx";

/* ---------------------------
   Loader
--------------------------- */
export async function loader({ params }) {
  try {
    const request = await fetchData({
      url: `/api/requests/${params.id}`,
      method: "GET",
    });
    const { user } = await fetchData({ url: "/api/me", method: "GET" });
    return { request, user };
  } catch (err) {
    return { error: "Failed to load request data" };
  }
}

/* ---------------------------
   Action (PATCH update)
--------------------------- */
export async function action({ request, params }) {
  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    if ("location_attributes" in updates && updates.location_attributes) {
      updates.location_attributes = JSON.parse(updates.location_attributes);
    }

    const data = await fetchData({
      url: `/api/requests/${params.id}`,
      method: "PATCH",
      submittedData: { request: updates },
    });

    return data ? redirect(`/requests/${params.id}`) : redirect("/requests");
  } catch (err) {
    console.error(err);
    return redirect("/requests"); // fallback
  }
}

/* ---------------------------
   Small helpers
--------------------------- */
function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

/* ---------------------------
   RequestShow Component
--------------------------- */
export default function RequestShow() {
  useDocumentTitle("Road Rescue - Request Details");

  const loaderData = useLoaderData();
  const { request: initialRequest, user, error } = loaderData;
  const [request, setRequest] = useState(initialRequest || null);
  const [providerLocation, setProviderLocation] = useState(
    initialRequest?.provider?.location
      ? [
          initialRequest.provider.location.latitude,
          initialRequest.provider.location.longitude,
        ]
      : null
  );
  const [routeInfo, setRouteInfo] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionError, setActionError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const cableContext = useContext(CableContext);
  const cable = cableContext?.cable;

  // memoized coordinates
  const requestCoords = useMemo(() => {
    if (!request?.location?.latitude || !request?.location?.longitude) return null;
    return [Number(request.location.latitude), Number(request.location.longitude)];
  }, [request?.location?.latitude, request?.location?.longitude]);

  const providerCoords = useMemo(() => {
    if (!providerLocation) return null;
    return [Number(providerLocation[0]), Number(providerLocation[1])];
  }, [providerLocation]);

  /* ---------------------------
     Cable subscription: live updates
  --------------------------- */
  useEffect(() => {
    if (!cable || !id) return;

    let channel = null;
    try {
      channel = cable.subscriptions.create(
        { channel: "RequestChannel", request_id: id },
        {
          received: (data) => {
            if (!data) return;
            setRequest((prev) => ({ ...prev, ...data }));
            if (data.provider?.location) {
              setProviderLocation([
                Number(data.provider.location.latitude),
                Number(data.provider.location.longitude),
              ]);
            }
          },
        }
      );
    } catch (err) {
      console.error("Subscription failed:", err);
    }

    return () => {
      try {
        if (channel?.unsubscribe) channel.unsubscribe();
      } catch {}
    };
  }, [cable, id]);

  /* ---------------------------
     Dialog state
  --------------------------- */
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const dateCreated = formatDate(request?.created_at);

  /* ---------------------------
     Optimistic Accept Request
  --------------------------- */
  const handleAcceptRequest = async () => {
    setLoadingAction(true);
    setActionError(null);

    // optimistic update
    setRequest((prev) => ({ ...prev, provider: user, status: "accepted" }));

    try {
      await fetchData({
        url: `/api/requests/${id}`,
        method: "PATCH",
        submittedData: { request: { status: "accepted", provider_id: user.id } },
      });
    } catch (err) {
      // rollback on error
      setRequest(initialRequest);
      setActionError("Failed to accept request.");
    } finally {
      setLoadingAction(false);
    }
  };

  /* ---------------------------
     Modular Subcomponents
  --------------------------- */
  const RequestInfo = () => (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Request</Typography>
        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <strong>Issue:</strong> {request?.service?.name || "—"}
        </Typography>

        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <strong>Vehicle:</strong>{" "}
          {request?.vehicle
            ? `${request.vehicle.plate_number} - ${request.vehicle.make || ""} ${request.vehicle.model || ""}`
            : "—"}
        </Typography>

        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <strong>Details:</strong> {request?.request_description || "—"}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Location:</strong>{" "}
          {request?.location?.district || (
            user?.type === "Driver" &&
            request?.vehicle?.driver?.id === user?.id ? (
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={openDialog}
              >
                Add Location
              </Button>
            ) : (
              "—"
            )
          )}
        </Typography>

        <Typography variant="caption">Created: {dateCreated}</Typography>
      </CardContent>
    </Card>
  );

  const ProviderInfo = () => (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">Provider details</Typography>
        <Divider sx={{ my: 1 }} />
        {request?.provider ? (
          <>
            <Typography variant="body2">Email: {request.provider.email}</Typography>
            <Typography variant="body2">Phone: {request.provider.phone}</Typography>
            <Typography variant="body2">
              Location: {request.provider.location?.district || "—"}
            </Typography>
          </>
        ) : (
          <Typography variant="body2">Waiting for provider response.</Typography>
        )}
      </CardContent>
    </Card>
  );

  const LocationDialog = () => (
    <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="md">
      <DialogTitle>Set Request Location</DialogTitle>
      <Form method="patch" style={{ padding: 16 }}>
        <MapPicker name="location_attributes" />
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            fullWidth
            color="success"
            variant="contained"
            onClick={closeDialog}
          >
            Submit new location
          </Button>
        </Box>
      </Form>
    </Dialog>
  );

  const LiveLocationSection = () => (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Live Location
        </Typography>
        <RequestMap
          requestLocation={requestCoords}
          providerLocation={providerCoords}
          onRouteInfo={setRouteInfo}
        />
        {routeInfo && (
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Distance: {routeInfo.distanceKm} km — ETA: {routeInfo.etaMin} min
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  const ActionButtons = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {actionError && <Alert severity="error">{actionError}</Alert>}
      {loadingAction && <CircularProgress size={24} />}

      {/* Provider accept button */}
      {!request?.provider &&
        request?.status === "reported" &&
        user?.type === "Provider" && (
          <Button
            fullWidth
            color="success"
            variant="contained"
            onClick={handleAcceptRequest}
            disabled={loadingAction}
          >
            Accept Request
          </Button>
        )}

      {request?.provider && (
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(`/chats/${request.chat?.id || ""}`)}
        >
          Chat with {user?.type === "Driver" ? "Provider" : "Driver"}
        </Button>
      )}

      {request?.invoice && user?.type === "Provider" && (
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={() => navigate(`/invoices/${request.invoice.id}`)}
        >
          Proceed to Invoice
        </Button>
      )}

      {request?.invoice?.is_submitted && user?.type === "Driver" && (
        <Button
          variant="contained"
          fullWidth
          color="error"
          onClick={() => navigate(`/invoices/${request.invoice.id}`)}
        >
          Proceed to Payments
        </Button>
      )}
    </Box>
  );

  /* ---------------------------
     Render
  --------------------------- */
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!request) return <CircularProgress />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}>
      <Typography variant="h5" align="center">
        Request Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <RequestInfo />
          <Box sx={{ mt: 2 }}>
            <ProviderInfo />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <LiveLocationSection />
          <Box sx={{ mt: 2 }}>
            {request?.invoice?.total && (
              <Card variant="outlined">
                <CardContent>
                  <Typography>
                    Invoiced Amount:{" "}
                    <Box component="span" sx={{ color: "salmon", fontWeight: 700 }}>
                      ${request.invoice.total}
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            )}
            <Box sx={{ mt: 2 }}>
              <ActionButtons />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <LocationDialog />
    </Box>
  );
}

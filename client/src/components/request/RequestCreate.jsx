import React from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import {
  Button,
  MenuItem,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { fetchData } from "../../services/fetchData";
import MapPicker from "../location/MapPicker.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import SelectServices from "../service/SelectServices.jsx";

/* ----------------------------------------------
 *  Loader
 * ---------------------------------------------- */
export async function loader() {
  const { user } = await fetchData({
    url: "/api/me",
    method: "GET",
  });

  const services = await fetchData({
    url: "/api/services",
    method: "GET",
  });

  const vehicles = await fetchData({
    url:
      user.type === "Driver"
        ? `/api/drivers/${user.id}/vehicles/`
        : `/api/vehicles`,
    method: "GET",
  });

  return { services, vehicles };
}

/* ----------------------------------------------
 *  Action
 * ---------------------------------------------- */
export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  if ("location_attributes" in updates && updates.location_attributes) {
    updates.location_attributes = JSON.parse(updates.location_attributes);
  }

  const data = await fetchData({
    url: "/api/requests",
    method: "POST",
    submittedData: { request: updates },
  });

  return data
    ? redirect("/requests/queue")
    : redirect("/requests/create");
}

/* ----------------------------------------------
 *  Component
 * ---------------------------------------------- */
export default function RequestCreate() {
  const { services, vehicles } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useDocumentTitle("Road Rescue - Create Request");

  return (
    <Box
      sx={{
        maxHeight: "90vh",
        overflowY: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center" color="success.main" gutterBottom>
        Create Rescue Request
      </Typography>

      <Form method="post" id="requestForm">
        {/* -------------------- Location Picker -------------------- */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Choose a Pickup Location
            </Typography>
            <MapPicker name="location_attributes" />
          </CardContent>
        </Card>

        {/* -------------------- Service Selection -------------------- */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Select Service
            </Typography>
            <SelectServices services={services} />
          </CardContent>
        </Card>

        {/* -------------------- Vehicle Selection -------------------- */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Vehicle
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              helperText="Select your vehicle"
              name="vehicle_id"
              defaultValue={vehicles[0]?.id || ""}
            >
              {vehicles.map((vehicle) => (
                <MenuItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.plate_number}
                </MenuItem>
              ))}
            </TextField>
          </CardContent>
        </Card>

        {/* -------------------- Additional Information -------------------- */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Additional Information
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              name="request_description"
            />
          </CardContent>
        </Card>

        {/* -------------------- Submit Button -------------------- */}
        <Button
          fullWidth
          color="warning"
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </Form>
    </Box>
  );
}

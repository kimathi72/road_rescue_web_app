import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Form } from "react-router-dom";

export default function VehicleCreate({user}) {


  return (
    <Form method="post">
      <h2 className="pageTitle"> Add a new vehicle</h2>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        gap={"1rem"}
        justifyContent={"center"}
        spacing={2}
      >
        <input
        type="hidden"
        name="driver_id"
        value={user?.id}
        />
        <TextField
          label="Plate Number"
          name="plate_number"
          required
        />
        <TextField label="Vehicle Make" name="make" onChange={handleChange} />

        <TextField
          label="Model of Vehicle"
          name="model"
          required
        />
        <TextField label="Vehicle Color" name="color" />
        <TextField
          label="Year of Manufacture"
          name="year"
        />
      </Stack>
      <Button fullWidth variant="contained" color="success" type="submit">
        Add Vehicle
      </Button>
    </Form>
  );
}

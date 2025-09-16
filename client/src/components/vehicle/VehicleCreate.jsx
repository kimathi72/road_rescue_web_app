import { Button, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Form } from "react-router-dom";

export default function VehicleCreate({user}) {


  return (
    <Grid  container direction={'column'} padding={5} bgcolor={'white'} textAlign={'center'} sx={{mb:4}}>
      <h3 style={{color: "green" }}>Enter new vehicle details</h3>
    <Form id='addVehicleForm' method="post">
        <input
        type="hidden"
        name="driver_id"
        value={user?.id}
        />
        <label>
          <span>Plate number</span>
 <TextField
          label="Plate Number"
          name="plate_number"
          required
        />
        </label>
       
        <label>
          <span>Make</span>
          <TextField label="Vehicle Make" name="make" />
          </label>
        <label>
          <span>Model</span>
 <TextField
          label="Model of Vehicle"
          name="model"
        />
        </label>
       
        <label>
          <span>Color</span>
        <TextField label="Vehicle Color" name="color" />
        </label>
        <label>
          <span>Year</span>
          <TextField
          label="Year of Manufacture"
          name="year"
        />
        </label>
        
      <Button fullWidth variant="contained" color="success" type="submit">
        Add Vehicle
      </Button>
    </Form>
    </Grid>
  );
}

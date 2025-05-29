import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function VehicleCreate({ user, handleSubmit }) {
  const [vehicle, setVehicle] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setVehicle((prev) => ({ ...prev, user_id: user.id }));
    }
  }, [user, setVehicle]);

  useEffect(() => {
    console.log(vehicle);
    isSubmitted && handleSubmit("/vehicles", "POST", { vehicle: vehicle });
  }, [isSubmitted, handleSubmit, vehicle]);

  const handleChange = (e) => {
    setVehicle((prev) => ({ ...prev, [`${e.target.name}`]: e.target.value }));
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
      }}
    >
      <Stack direction={"column"} spacing={2}>
        <h3 style={{ textAlign: "center", color: "green" }}> Add a vehicle</h3>

        <TextField
          label="Plate Number"
          name="plate_number"
          onChange={handleChange}
        />
        <TextField label="Vehicle Make" name="make" onChange={handleChange} />

        <TextField
          label="Model of Vehicle"
          name="model"
          onChange={handleChange}
        />
        <TextField
          label="Year of Manufacture"
          name="year"
          onChange={handleChange}
        />

        <Button type="submit">Add Vehicle</Button>
      </Stack>
    </form>
  );
}

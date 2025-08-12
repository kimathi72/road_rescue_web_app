import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VehicleCreate({ user }) {
  const [vehicle, setVehicle] = useState({});
  const token = localStorage.getItem('jwt')
  const navigate = useNavigate()
    useEffect(() => {
    user && setVehicle({ ...vehicle, "user_id": user.id })
    
  }, [user]);
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(vehicle)

    const res = await fetch('/api/vehicles', {
      method:"POST",
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }, body: JSON.stringify(
        {"vehicle": vehicle}
      )
    })
    const data = await res.json()
    console.log(data)
    if (!data.error ){navigate(-1)}
  }

  const handleChange = (e) => {
    console.log(vehicle)

    setVehicle({ ...vehicle, [`${e.target.name}`]: e.target.value });
  };

  return (
    <form
      className="form"
      onSubmit={
        handleSubmit
      }
    >
        <h3 className="pageTitle"> Add a new vehicle</h3>
<Stack direction={"row"} flexWrap={'wrap'} alignItems={'center'} gap={'1rem'} justifyContent={'center'} spacing={2}>
        <TextField
          label="Plate Number"
          name="plate_number"
          required
          onChange={handleChange}
        />
        <TextField label="Vehicle Make" name="make" onChange={handleChange} />

        <TextField
          label="Model of Vehicle"
          name="model"
          required
          onChange={handleChange}
        />
        <TextField label="Vehicle Color" name="color" onChange={handleChange} />
        <TextField
          label="Year of Manufacture"
          name="year"
          onChange={handleChange}
        />
</Stack>
        <Button variant="contained" color='success' type="submit">Add Vehicle</Button>
      
    </form>
  );
}

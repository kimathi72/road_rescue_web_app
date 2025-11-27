import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export default function SelectServices({ services }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <Grid container spacing={1} sx={{ mt: 1, flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" sx={{ width: "100%", mb: 1 }}>
        What service do you need?
      </Typography>

      {/* Hidden field for the form */}
      <input type="hidden" name="service_id" value={selectedService || ""} required/>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 2,
        }}
      >
        {services.map((service) => {
          const isSelected = selectedService === service.id;

          return (
            <Card
              key={service.id}
              sx={{
                width: 160,
                height: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
                transition: "0.2s",
              }}
              onClick={() =>
                setSelectedService(
                  selectedService === service.id ? null : service.id
                )
              }
            >
              <CardMedia
                component="img"
                image="https://www.svgrepo.com/show/253092/engine-motor.svg"
                alt={service.name}
                sx={{
                  height: 110,
                  width: "100%",
                  objectFit: "contain",
                  p: 1,
                }}
              />

              <CardContent sx={{ textAlign: "center", py: 1 }}>
                <Typography variant="body1" fontWeight="bold">
                  {service.name}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "center", pb: 1 }}>
                <Button
                  size="small"
                  variant={isSelected ? "contained" : "outlined"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(
                      selectedService === service.id ? null : service.id
                    );
                  }}
                >
                  {isSelected ? "Selected" : "Select Service"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Grid>
  );
}

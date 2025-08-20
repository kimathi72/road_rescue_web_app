import * as React from "react";
import { Grid, Button } from "@mui/material";
export default function TemporaryDrawer({ links, user }) {
  return (
    !!user && (
      <Grid
        container
        gap={"1rem"}
        direction={{ xs: "grow", md: "column", lg: "column" }}
        justifyContent={"left"}
      >
        {links.map(({ link, icon, text }, index) => {
          return (
            <Button
              color={
                user.role === "driver"
                  ? "success"
                  : user.role === "provider"
                  ? "warning"
                  : "default"
              }
              href={link}
              startIcon={icon}
              variant="contained"
            >
              {text}
            </Button>
          );
        })}
      </Grid>
    )
  );
}

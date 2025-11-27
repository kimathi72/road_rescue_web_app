import { Outlet, useNavigate } from "react-router-dom";
import { CableProvider } from "./context/cable";
import { Grid, Paper, Typography } from "@mui/material";
import NavBar from "./components/navigation/NavBar";
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
    const baseUrl =
  import.meta.env.PROD
    ? ''              // Rails will serve this
    : 'http://localhost:3000'; // dev via proxy
  useEffect(() => {
    !!token &&
      fetch(baseUrl + "/api/me",
        {headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }}
      ).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setUser(data.user);
          });
        } else {
          navigate("/signin");
        }
      });
  }, [token, navigate]);

  return (
    <Grid container direction={"column"} width={"100%"} height={"100%"}>
      <Grid
        id="app"
        container
        direction={{ xs: "column", md: "column", lg: "row" }}
        justifyContent={"center"}
      >
        <NavBar type={user?.type} />
        <CableProvider>
          <Grid
            container
            padding={"1rem"}
            direction={"column"}
            size={{ xs: 12, md: 12, lg: 9 }}
            sx={{ overflowY: "auto" }}
          >
            <Typography
              variant="overline"
              gutterBottom
              sx={{ display: "block" }}
            >
              Welcome {user?.name || "to Road Rescue"}
            </Typography>
            <Outlet />
          </Grid>
        </CableProvider>
      </Grid>
      <Paper
        elevation={3}
        sx={{
          mt: "1rem",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 0.5,
          textAlign: "center",
        }}
      >
        <p>
          © Road Rescue App - {new Date().getFullYear()} Developed by{" "}
          <a
            href="https://github.com/kimathi72"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4cafef" }}
          >
            Roy Kimathi
          </a>
        </p>
      </Paper>
    </Grid>
  );
}

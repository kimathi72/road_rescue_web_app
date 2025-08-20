import { useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import PreviewIcon from "@mui/icons-material/Preview";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Drawer from "./Drawer";
import LogoutIcon from "@mui/icons-material/Logout";
import ShieldIcon from '@mui/icons-material/Shield';
export default function NavBar({ user }) {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    console.log(user);
    
    switch (user.role) {
      case "admin":
        setLinks([
          {
            icon: <PreviewIcon />,
            link: "/requests/overview",
            text: "Requests Overview",
          },
          {
            icon: <SupervisedUserCircleIcon />,
            link: "/users",
            text: "Users Management",
          },
          {
            icon: <AnalyticsIcon />,
            link: "/system_logs",
            text: "System Logs",
          },
          {
        icon: <LogoutIcon />,
        link: "/signout",
        text: "Sign out",
      },
        ]);

        break;
      case "provider":
        setLinks([
          {
            icon: <DepartureBoardIcon />,
            link: "/requests",
            text: "Requests List",
          },
          {
            icon: <MonetizationOnIcon />,
            link: "/requests/queue",
            text: "Requests Queue",
          },
          {
            icon: <AccountCircleIcon />,
            link: "/account/provider",
            text: "Account Management",
          },
          {
        icon: <LogoutIcon />,
        link: "/signout",
        text: "Sign out",
      },
        ]);

        break;

      default:
        setLinks([
          {
            icon: <CarCrashIcon />,
            link: "/requests/create",
            text: "Create Request",
          },
          {
            icon: <DepartureBoardIcon />,
            link: "/requests/queue",
            text: "Requests Queue",
          },
          {
            icon: <ReceiptIcon />,
            link: "/invoices",
            text: "Invoices",
          },
          {
        icon: <LogoutIcon />,
        link: "/signout",
        text: "Sign out",
      },
        ]);

        break;
    }
  }, [user]);
  const location = useLocation();
  const { pathname } = location;
  const token = localStorage.getItem("jwt");
  return (
    !!user && (
      <Grid
      container
        direction={"column"}
        size={{xs:'grow', md: 3, lg: 2}}
        gap={'1rem'}
      >
        <Grid
        container 
        direction={'row'}
        justifyContent={'center'}
         sx={{
          color: "whitesmoke", 
          padding: "1.5rem",
          gap: "0.5rem",
          a:{color: "white"},
          backgroundColor: user.role === "driver" ? "#288135ff": user.role === "admin" ? "#3B82F6": "#f5740bff",
          }}>
          <ShieldIcon/>
          <Link href="/" underline="hover">
          <h5>RoadRescue</h5>
        </Link>
        </Grid>
        
        {!!user && !!token ? (
          <Drawer links={links} user={user} />
        ) : pathname === "/signup" ? (
          <Link color="primary" href="/signin" underline="hover">
            SignIn
          </Link>
        ) : (
          <Link href="/signup" color="info" underline="hover">
            SignUp
          </Link>
        )}
      </Grid>
    )
  );
}

import { useLocation } from "react-router-dom";
import { Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Drawer from "./Drawer";
import LogoutIcon from "@mui/icons-material/Logout";
import ShieldIcon from '@mui/icons-material/Shield';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import CommuteIcon from '@mui/icons-material/Commute';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';


export default function NavBar({ user }) {
  const [links, setLinks] = useState([]);
  const location = useLocation()
  const {pathname} = location 

  useEffect(() => {
    console.log(user);
    
    switch (user.role) {
      case "provider":
        setLinks([
          {
            icon: <HomeIcon />,
            link: "/",
            text: "Home",
          },
          {
            icon: <LocationOnIcon />,
            link: "/location",
            text: "My Location ",
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
            icon: <HomeIcon/>,
            link: "/",
            text: "Home",
          },
          {
            icon: <CommuteIcon />,
            link: "/vehicles",
            text: "My Vehicles ",
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

import { useLocation } from "react-router-dom";
import Link from '@mui/material/Link';
import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import PreviewIcon from '@mui/icons-material/Preview';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Drawer from './Drawer'
import LogoutIcon from '@mui/icons-material/Logout';
export default function NavBar({user}) {
  const [links, setLinks] = useState([])
  const [urls, setUrls] = useState([])
  useEffect(()=>{
    console.log(user)
      setUrls([{
          icon: <LogoutIcon/>,
          url:'/signout',
          text: 'Sign out'
        }])
     switch (user.role) {
      case 'admin':
        setLinks([
          {
            icon: <PreviewIcon/>,
            link: '/requests/overview', 
            text: 'Requests Overview'
          },
          {
            icon: <SupervisedUserCircleIcon/>,
            link: '/users', 
            text: 'Users Management'
          }, 
          {
            icon: <AnalyticsIcon/>,
            link: '/system_logs', 
            text: 'System Logs'
          }
        ])
        
        break;
        case 'provider':
        setLinks([
          {
            icon: <DepartureBoardIcon/>,
            link: '/requests', 
            text: 'Requests List'
          }, 
          {
            icon: <MonetizationOnIcon/>,
            link: '/requests/queue', 
            text: 'Requests Queue'
          }, 
          {
            icon: <AccountCircleIcon/>,
            link: '/account/provider', 
            text: 'Account Management'
          }
        ])
        
        break;
    
      default:
        setLinks([
          {
            icon: <CarCrashIcon/>,
            link: '/requests/create', 
            text: 'Create Request'
          }, 
          {
            icon: <DepartureBoardIcon/>,
            link: '/requests/queue', 
            text: 'Requests Queue'
          }, 
          {
            icon: <ReceiptIcon/>,
            link: '/invoices', 
            text: 'Invoices'
          }
        ])
      
        break;
    }
  },[user])
  const location = useLocation()
  const {pathname} = location
  const token = localStorage.getItem('jwt')
  return (
   !!user && <Grid
   container
   className="navBar"
      justifyContent={'space-between'}
      direction={'row'}
      alignItems={'center'}
      sx={{
        width: '100%',
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
        padding: "0.5rem",
      }}
      
    >
      <Link  href="/" underline="hover"><h5>Road Rescue WebApp</h5></Link>
      {
            !!user && !!token ? <Drawer links={links} urls={urls}/> : pathname === "/signup" ? <Link  color="primary" href="/signin" underline="hover">SignIn</Link> : <Link href="/signup" color="info" underline="hover">SignUp</Link> 
          }

    </Grid>
  );
}


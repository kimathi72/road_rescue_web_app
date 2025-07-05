import { useLocation } from "react-router-dom";
import Link from '@mui/material/Link';
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
            icon: <SupervisedUserCircleIcon/>,
            link: '/', 
            text: 'Users'
          }, 
          {
            icon: <AnalyticsIcon/>,
            link: '/analytics', 
            text: 'Analytics'
          }, 
          {
            icon: <AccountCircleIcon/>,
            link: '/account', 
            text: 'Account'
          }
        ])
        
        break;
        case 'provider':
        setLinks([
          {
            icon: <DepartureBoardIcon/>,
            link: '/', 
            text: 'Requests'
          }, 
          {
            icon: <MonetizationOnIcon/>,
            link: '/earnings', 
            text: 'Earnings'
          }, 
          {
            icon: <AccountCircleIcon/>,
            link: '/account', 
            text: 'Account'
          }
        ])
        
        break;
    
      default:
        setLinks([
          {
            icon: <HomeIcon/>,
            link: '/', 
            text: 'Home'
          }, 
          {
            icon: <CarCrashIcon/>,
            link: '/requests', 
            text: 'Requests'
          }, 
          {
            icon: <AccountCircleIcon/>,
            link: '/account', 
            text: 'Account'
          }
        ])
      
        break;
    }
  },[user])
  const location = useLocation()
  const {pathname} = location
  const token = localStorage.getItem('jwt')
  return (
   !!user && <Stack
   className="navBar"
      justifyContent={'space-between'}
      direction={'row'}
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

    </Stack>
  );
}


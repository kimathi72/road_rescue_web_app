import React from 'react'
import { Button, List, Stack,} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import AdminNav from "./AdminNav";
import ProviderNav from "./ProviderNav";
import DriverNav from "./DriverNav";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
export default function Nav({type}) {
     const {pathname} = useLocation()

  return (
    <nav>
        <List id="navLinks" >
          <Stack sx={{flexWrap: "wrap", gap: '0.2rem'}} direction={{xs: "column", sm: "column", md: "row", lg: "column"}} spacing={2}>
          {type === "Admin" ? (
            <AdminNav/>
          ) : type === "Provider" ? (
            <ProviderNav/>
          ) : type === "Driver" && (
            <DriverNav/>
          )}
          <li key={'auth'}>
            {!!type ? (
              <NavLink to={"/signout"}><Button color="warning" startIcon={<LogoutIcon/>}>Sign Out</Button></NavLink>
            ) : !type && (pathname === '/signin' ? (
              <NavLink to='/signup'><Button variant='contained' startIcon={<PersonAddIcon/>}>Sign Up</Button></NavLink>
            ) : pathname === '/signup' && <NavLink to={'/signin'}><Button  variant='contained' startIcon={<LoginIcon/>}>Sign Up</Button></NavLink>
            )}
          </li>
          </Stack>
        </List>
      </nav>
  )
}

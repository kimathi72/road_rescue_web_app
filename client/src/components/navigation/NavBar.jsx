import { Button, Grid, List, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import logo from './logo.png'
import Nav from "./Nav";
import TemporaryDrawer from "./Drawer";


export default function NavBar({ type }) {
      const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid container size={{xs: 12, md: 12, lg: 2}}  justifyContent={'space-between'} alignItems={'flex-start'} id="navBar" direction={{xs:'row', md: 'row', lg: 'column'}} >
      <Grid 
      container
       size={{xs: 2, md: 2, lg: 12}} 
       id="logoDiv">
        <img src={logo} alt="logo"/>
      </Grid>
      <Grid>
      {isDesktop ? <Nav type={type}/> : <TemporaryDrawer><Nav type={type}/></TemporaryDrawer>}
      </Grid>
    </Grid>
  );
}

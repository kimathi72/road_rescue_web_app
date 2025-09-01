import { Button, Grid, List, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import logo from './logo.png'
import Nav from "./Nav";
import TemporaryDrawer from "./Drawer";


export default function NavBar({ type }) {
      const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid size={{xs: 12, md: 12, lg: 2}} container justifyContent={'space-evenly'} id="navBar" direction={{xs:'row', md: 'row', lg: 'column'}} gap={'2rem'}>
      <Grid 
      alignSelf={'left'}
       size={{xs: 2, md: 2, lg: 12}} 
       id="logoDiv">
        <img src={logo} alt="logo"/>
      </Grid>
      
      {isDesktop ? <Nav type={type}/> : <TemporaryDrawer><Nav type={type}/></TemporaryDrawer>}
      
    </Grid>
  );
}

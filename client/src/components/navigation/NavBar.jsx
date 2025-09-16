import { Button, Grid, List, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import logo from './logo.png'
import Nav from "./Nav";
import TemporaryDrawer from "./Drawer";


export default function NavBar({ type }) {
      const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid container size={{xs: 12, md: 12, lg: 2}} padding={1}  justifyContent={'space-between'} alignItems={'flex-start'} id="navBar" direction={{xs:'row', md: 'row', lg: 'column'}} >
      <Grid 
      container
       size={{xs: 1.5, md: 1.5, lg: 12}} 
       id="logoDiv">
        <img width={'inherit'} src={logo} alt="logo"/>
      </Grid>
      <Grid container size={{xs: 10.5, md: 10.5, lg: 12}} justifyContent={{xs: 'flex-end', md: "flex-end", lg: "center"}} alignItems={'center'} >
      {isDesktop ? <Nav type={type}/> : <TemporaryDrawer><Nav type={type}/></TemporaryDrawer>}
      </Grid>
    </Grid>
  );
}

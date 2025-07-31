import React, { useEffect } from 'react'
import useQuery from '../../hooks/useQuery'
import { Box, Button, Tab, Tabs } from '@mui/material'

export default function ManageServices() {
  const {data: services, isLoaded} = useQuery('/services')
   const [value, setValue] = React.useState(0); 
    const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    console.log(value)
  },[value])

  return (
    isLoaded && <Box sx={{ maxWidth: { xs: 320, sm: 480 }}}>
      <p>What is the probem ?</p>
      <Tabs
      value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
         textColor="secondary"
  indicatorColor="secondary"
        aria-label="scrollable force tabs example"

    >{
      services.map((service,index)=>{
        return <Tab key={index} label={service.name}/>
      })
      }</Tabs></Box>
  )
}

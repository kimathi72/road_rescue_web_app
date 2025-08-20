import * as React from 'react';
import { Grid, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
export default function TemporaryDrawer({links, user}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 230,  }} role="presentation" onClick={toggleDrawer(false)}>
      
    </Box>
  );

  return (
   !!user && <Grid container gap={'1rem'} direction={{xs: 'grow', md: 'column', lg: 'column'}} justifyContent={'left'}>
      
      {
        links.map(({link,icon,text},index)=>{
          return <Button 
          color={user.role === 'driver' ? 'success' : user.role === 'provider' ? 'warning' : 'default' } 
          href={link} 
          startIcon={icon}
          variant='contained'
          >
            {text}
          </Button>
          
        })
     
      }
      
    </Grid>
  );
}













{/* <List>
        {links.map(({link,icon,text}, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton href={link}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {urls.map(({url, icon, text}, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton href={url}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemText } from '@mui/material';
export default function TemporaryDrawer({links, urls}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250,  }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
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
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><MenuIcon/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

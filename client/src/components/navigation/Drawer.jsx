import * as React from "react";
import { Drawer, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function TemporaryDrawer({ children }) {
   const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
     <div>
      <Button color="default" onClick={toggleDrawer(true)} startIcon={<MenuIcon/>}>Open Menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} sx={{'& .MuiDrawer-paper': {boxSizing: 'border-box', display:'flex', width: 250, padding: 0.5, alignItems: 'flex-start',backgroundColor: 'rgba(245, 238, 237, 0.96)'}}}>
        {children}
      </Drawer>
    </div>
  );
}

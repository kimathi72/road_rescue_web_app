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
      <Button onClick={toggleDrawer(true)} startIcon={<MenuIcon/>}>Open Menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {children}
      </Drawer>
    </div>
  );
}

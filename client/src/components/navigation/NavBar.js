import { useLocation } from "react-router-dom";
import Link from '@mui/material/Link';
import { Stack } from "@mui/material";

export default function NavBar({user}) {
  const location = useLocation()
  const {pathname} = location

  return (
    <Stack
      alignItems={'end'}
      sx={{
        width: '100%',
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
        padding: "1rem",
        borderBottom: "1px solid #000" 
      }}
      
    >
      {
            !user ? pathname === "/signup" ? <Link  color="primary" href="/signin" underline="hover">Sign in</Link> : <Link href="/signup" color="info" underline="hover">Sign up</Link>  : <Link href="/signout"  color="warning" underline="hover">Sign out</Link>
          }

    </Stack>
  );
}


// <Navbar id="navBar" className="d-flex justify-content-between bg-light">  
//     <Container>
//         <Navbar.Brand href="/">
//         <div id="logo">
//           <b id="appName">Road Rescue Web App</b>
//         </div>
//         </Navbar.Brand>
//         <Nav>        
          
//         </Nav> 
//         </Container>        
//     </Navbar>
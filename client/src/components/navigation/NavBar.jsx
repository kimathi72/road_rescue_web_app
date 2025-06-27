import { useLocation } from "react-router-dom";
import Link from '@mui/material/Link';
import { Stack } from "@mui/material";

export default function NavBar({user}) {
  const location = useLocation()
  const {pathname} = location
  const token = localStorage.getItem('jwt')
  return (
    <Stack
      justifyContent={'space-between'}
      direction={'row'}
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
      <Link  color="secondary" href="/" underline="hover"><b>Road Rescue & Claims Tracking WebApp</b></Link>
      {
            !!user && !!token ? <Stack direction={'row'} spacing={1}>
              <Link href="/incidents"  color="secondary" underline="hover">Incidents</Link>
              <Link href="/claims"  color="secondary" underline="hover">Claims</Link>
              {user.role === "driver" ? <Link href="/vehicles"  color="secondary" underline="hover">Vehicles</Link>: <Link  underline="hover" href='/assessments' color="secondary">Assessments</Link>}
              {user.role === "admin" && <Link href="/users"  color="secondary" underline="hover">Users</Link>}
              <Link href="/signout"  color="warning" underline="hover">SignOut</Link>
            </Stack> : pathname === "/signup" ? <Link  color="primary" href="/signin" underline="hover">SignIn</Link> : <Link href="/signup" color="info" underline="hover">SignUp</Link> 
          }

    </Stack>
  );
}


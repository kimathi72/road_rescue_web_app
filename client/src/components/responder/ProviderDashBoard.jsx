import ListIcon from '@mui/icons-material/List';
import HistoryIcon from '@mui/icons-material/History';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {Card, CardContent, Grid, IconButton, Typography} from '@mui/material'
import { Link } from 'react-router-dom';
export default function ProviderDashBoard({user}) {
  return (
    user && <Grid container gap={'2rem'} direction={'column'}>
      <h3>Welcome, {user.name || user.email}</h3>
      <Grid container gap={'1rem'} direction={'row'}>
        <Link to={'/requests'}>
        <Card >
          <CardContent>
             <IconButton>
              <ListIcon/>
            </IconButton>
            <Typography variant='h6'>
              Rescue Requests List
            </Typography>
          </CardContent>
        </Card>
        </Link>
        <Link to={'/requests/queue'}>
        <Card>
          <CardContent>
            <IconButton>
              <HistoryIcon/>
            </IconButton>
            <Typography variant='h6'>
              Accepted Rescue Requests
            </Typography>
          </CardContent>
        </Card>
        </Link>
       

      </Grid>
    </Grid>
  )
}

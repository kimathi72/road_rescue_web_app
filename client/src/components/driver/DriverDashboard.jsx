import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';

import {Card, CardContent, Grid, IconButton, Typography} from '@mui/material'
import { Link } from 'react-router-dom';
export default function DriverDashboard({user}) {
  return (
    user && <Grid container gap={'2rem'} direction={'column'}>
      <h3>Welcome, {user.name || user.email}</h3>
      <Grid container gap={'1rem'} direction={'row'}>
        <Link to={'/requests/create'}>
        <Card >
          <CardContent>
             <IconButton>
              <AddIcon/>
            </IconButton>
            <Typography variant='h6'>
              Create Rescue Request
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
              Rescue History
            </Typography>
          </CardContent>
        </Card>
        </Link>
        

      </Grid>
    </Grid>
  )
}

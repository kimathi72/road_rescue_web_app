import React from 'react'
import GroupIcon from '@mui/icons-material/Group';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import {Card, CardContent, Grid, IconButton, Typography} from '@mui/material'
import { Link } from 'react-router-dom';

export default function AdminDashboard({user}) {
  return (
    user && <Grid container gap={'2rem'}>
      <h3>Welcome, {user.name || user.email}</h3>
      <Grid container>
        <Link to={'/users'}>
        <Card >
          <CardContent>
             <IconButton>
              <GroupIcon/>
            </IconButton>
            <Typography variant='h6'>
              User Management 
            </Typography>
          </CardContent>
        </Card>
        </Link>
        <Link to={'/requests/overview'}>
        <Card>
          <CardContent>
            <IconButton>
              <SummarizeIcon/>
            </IconButton>
            <Typography variant='h6'>
              Rescue Overview
            </Typography>
          </CardContent>
        </Card>
        </Link>
        <Link to={'/analytics'}>
        <Card>
          <CardContent>
            <IconButton>
              <AnalyticsIcon/>
            </IconButton>
            <Typography variant='h6'>
              Log List
            </Typography>
          </CardContent>
        </Card>
        </Link>

      </Grid>
    </Grid>
  )
}

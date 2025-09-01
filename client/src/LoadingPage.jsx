import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

export default function LoadingPage({children}) {
  return (
    <Grid container id="loadingPage">
        <CircularProgress color='success'/>
        {children}
    </Grid>
  )
}

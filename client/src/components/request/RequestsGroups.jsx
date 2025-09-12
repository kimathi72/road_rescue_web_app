import React, { useEffect, useState } from 'react'
import { fetchData } from '../../services/fetchData'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import MapPicker from '../location/MapPicker'
import {toast} from 'react-toastify'
export async function loader (){
    const groupedRequests = await fetchData({
        url: '/api/city_requests',
        method: "GET"
    })
    console.log(groupedRequests)
    return {groupedRequests}
}
export async function action({request,params}){
 const formData = await request.formData()
 const updates = Object.fromEntries(formData)
 const data = await fetchData({
    url: `/api/users/${params.userId}`,
    method: "PATCH",
    submittedData:{"user": updates}
 })
 !!data && redirect("/")
}

export default function RequestsGroups() {
    const [isLoaded, setIsLoaded]= useState(false)
    useEffect(()=>{
 !isLoaded && alert('no requests in your current location')
 !isLoaded && setIsLoaded(!isLoaded)
    },[isLoaded])
    
    const {groupedRequests} = useLoaderData()
    console.log(groupedRequests)
  return (
    <Grid container direction={'column'} gap={'1rem'}>

        <h4>Open requests count by location</h4>
        <Grid container direction={'row'} gap={'1rem'}>
        {
            groupedRequests.map((g,i)=>{
                return <Card key={i}>
                    <CardContent>
                        <Typography variant='heading-4'>
                            {g.city}
                        </Typography>
                        <Typography >
                           Count: {g.count}
                        </Typography>
                    </CardContent>
                </Card>
            })
        }
        </Grid>
        <Grid container direction={'column'} bgcolor={'ghostwhite'}>
            <h5>Update Location below</h5>
            <Form method={'patch'}>
            <MapPicker/>
            <Button fullWidth variant='contained' type='submit'>update Location</Button>
            </Form>
        </Grid>
    </Grid>
  )
}

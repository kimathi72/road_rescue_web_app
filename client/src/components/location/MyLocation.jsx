import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateLocation from './CreateLocation'
import useQuery from '../../hooks/useQuery'

export default function MyLocation({user}) {
    const [location, setLocation] = useState(null)
    console.log(!!user && user)
    const {data,isLoaded} = useQuery(`/locations/${!!user && !!user.location.id && user.location.id}`)
    useEffect(()=>{
        !!isLoaded && setLocation(data)
    },[isLoaded,data])
    const DefineLocation = () =>{
        return <Box>
                <h6>Please set Location below</h6>
                <form onSubmit={handleSubmit}>
                <CreateLocation setData={setLocation}/>
                <Button type='submit'>Submit</Button>
                </form>
            </Box>
    }
const handleSubmit = async (e) =>{
  e.preventDefault() 
  const res = await fetch(`/users/${user.id}/location`,{
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': "application/json"
    }, body: JSON.stringify({"location": data})
  })
  const data = await res.json()
  console.log(data)
  setLocation(data)
} 
  return (
    <Grid container>
        {
            (!!location) ? <Box>
                <h6>User's Location details</h6>
                <Card>
                    <CardContent>
                        <Typography>
                            District: {location.district}
                        </Typography>

                        <Typography>
                            City: {location.city}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={(e)=>{
                            setLocation(null)
                        }} >Change Location</Button>
                    </CardActions>
                </Card>
            </Box> : <DefineLocation/>
        }
    </Grid>
)
}

import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateLocation from './CreateLocation'
import useQuery from '../../hooks/useQuery'
import Map from './Map'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import ReverseGeoCoding from './ReverseGeoCoding'

export default function MyLocation({user}) {
    const [location, setLocation] = useState(null)
    const [position, setPosition] = useState([-1.2812288,36.8214016])
    console.log(!!user && user)
    // const {data,isLoaded} = useQuery(`/locations/${!!user && !!user.location.id && user.location.id}`)
    useEffect(()=>{
        !!user && !!user.location && setLocation(user.location) 
    },[user])

const FindLocation = () =>{
    const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
        console.log(e.latlng)
      setPosition([e.latlng.lat, e.latlng.lng])
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
    const DefineLocation = () =>{
        const map =  useMap()
        const provider = new OpenStreetMapProvider();

const searchControl = new GeoSearchControl({
  provider: provider,
});

  useEffect(() => {
    map.addControl(searchControl);

    console.log(searchControl)
    return () => map.removeControl(searchControl);
  }, []);

  return null;
}

    //     return <Box>
    //             <h6>Please set Location below</h6>
    //             <form onSubmit={handleSubmit}>
    //             <CreateLocation setData={setLocation}/>
    //             <Button type='submit'>Submit</Button>
    //             </form>
    //         </Box>
    // }
const handleSubmit = async (e) =>{
  e.preventDefault() 
  console.log(location)
  const res = await fetch(`/users/${user.id}/location`,{
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': "application/json"
    }, body: JSON.stringify({"location": location})
  })
  const data = await res.json()
  console.log(data)
  setLocation(data)
} 
  return (
    <Grid container >
        {
            !!user && !user.location.city ?<Grid container direction={'column'} gap={'3rem'}> <Map position={[-1.2812288,36.8214016]}>
                <FindLocation/>
            </Map> <ReverseGeoCoding setLocation={setLocation} position={position}/> 
            
            </Grid>: <Grid container direction={'column'} gap={'2rem'}>
                <h6>User's Location details</h6>
                <Card>
                    <CardContent>
                        <Typography>
                            District: {user.location.district}
                        </Typography>

                        <Typography>
                            City: {user.location.city}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={(e)=>{
                            setLocation(null)
                        }} >Change Location</Button>
                    </CardActions>
                </Card>
                <Map position={position}>

                </Map>
            </Grid> 
        }
    </Grid>
)
}

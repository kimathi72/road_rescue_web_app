import React, { useEffect, useState } from 'react'
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps' 

export default function IncidentLocation ({location}){
    const [position, setPosition] = useState({lat: 1.2921,lng: 36.8219})
    useEffect(()=>{
     location && setPosition(location) 
    },[location])
    return(
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY.toString()}>
            <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
                <AdvancedMarker position={position}/>
            </Map>
        </APIProvider>
    )
}
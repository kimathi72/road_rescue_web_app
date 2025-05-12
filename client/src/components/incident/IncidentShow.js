import { ImageList, ImageListItem } from '@mui/material'
import React from 'react'

export default function IncidentShow({incident}) {
    const {vehicle,location,driver,claims,photos,  ...rest} = incident
  return (
    <div>
        <h2>{vehicle['plate_number']}</h2>
        <p>Make:{vehicle['make']}, model: {vehicle['model']}</p>
        <p>Location: {location['city']}</p>
        <p>Driver: {driver['name']}</p>
        <div>
            <h3>Incident Photos</h3>
            <ImageList>
            {
                photos.length && photos.map((photo, index) => {
                    <ImageListItem key={index}>
                        <img
                        src={photo['image_url']}
                        />
                    </ImageListItem>
                })  
            }</ImageList>
        </div>
    </div>
  )
}

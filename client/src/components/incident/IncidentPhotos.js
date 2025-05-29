import { ImageList, ImageListItem, Stack } from '@mui/material'
import React from 'react'

export default function IncidentPhotos({photos}) {
  return (
    <Stack>
        <ImageList>
            {
                photos.length > 0 ? photos.map((photo, index)=>{
                    return <ImageListItem key={index}>
      <img
        srcSet={`${photo.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${photo.img}?w=164&h=164&fit=crop&auto=format`}
        alt={item.title}
        loading="lazy"
      />
    </ImageListItem>
                })
            }
        </ImageList>
    </Stack>
  )
}

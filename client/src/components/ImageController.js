import React from 'react'
import Image from 'react-bootstrap/Image'


export default function ImageController({src}) {
  return (
    <Image src= {src} style={{width: '100%', height: "auto"}} fluid/> 
  )
}

import { Button } from '@mui/material'
import React, {useEffect, useRef} from 'react'

export default function UploadWidget({setData, label}) {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary 
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "rails-react",
            uploadPreset: "react-rails"
        }, (error, result)=>{
            if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info); 
      setData(result.info.url)
    }
           
        }
    )
    },[setData])
  return (
    <Button onClick={()=> widgetRef.current.open()}>{label}</Button>
  )
}

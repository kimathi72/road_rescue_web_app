import {useCallback, useState} from 'react'
import { Stack } from "@mui/material";
import { useParams } from 'react-router-dom';
import UploadWidget from '../util/UploadWidget';


export default function IncidentPhotos() {
    const [photos, setPhotos] = useState([])
    const params = useParams()
    const id = params.id
    const fetchData = useCallback(async(file)=>{
      const result = await fetch('/incident_photos',{
            method: "POST",
            headers:{
              "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
              "Content-Type": "application/json"
            }, body: JSON.stringify({
              "incident_photo":{
                "incident_id": id,
                "image_url": file.uploadInfo.url
              }
            })
          })
          const data = await result.json()
          console.log(data)

    },[id])
    const handleUpload = (e) => {
        e.preventDefault()
        photos.map((file)=>{
        return  fetchData(file)
        })
        
    }
    

  return (
    <Stack direction={'column'} spacing={2}>
         <UploadWidget label={"upload incident Photos"} setData={setPhotos} onUpload={handleUpload}/> 
    </Stack>
  )
}

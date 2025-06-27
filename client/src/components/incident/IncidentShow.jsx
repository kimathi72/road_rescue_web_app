import { ImageList, ImageListItem } from '@mui/material'
import useQuery from '../../hooks/useQuery'
import { useParams } from 'react-router-dom'

export default function IncidentShow() {
    const params = useParams()
    const id = params.id
    console.log(id)
    const url =  `/incidents/${!!id && id}`
    const {data: incident, isLoaded} = useQuery(url)
  return (
    <div>
       {
        isLoaded ? <div>
            show incident
                       {
                incident['incident_photos'].length && <ImageList>
                    <h3>Uploaded Images </h3>
 {incident['incident_photos'].map((photo, index) => {
               return     <ImageListItem key={index}>
                        <img
                        src={photo['image_url']}
                        alt={photo['incident_id']}
                        />
                    </ImageListItem>
                })  
            }</ImageList> }
        </div> : <p>Loading incident...</p>
       }
        <div>
            <h3>Incident Photos</h3>
            
        </div>
    </div>
  )
}

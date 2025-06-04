import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function ClaimCreate() {
    const [claim, setClaim] = useState({})
    const params = useParams()
    const incidentId = params.id
    useEffect(()=>{console.log(claim)},[claim])
    const handleClick = ()=>{
        fetch('/claims', {
            method:"POST", 
            headers:{
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                "claim":{
                    "incident_id": incidentId
                }
            })
        }).then(r=>r.json()).then(data=>{
            setClaim(data)
        })
    }

  return (
    <Button onClick={handleClick}>New Claim</Button>
  )
}




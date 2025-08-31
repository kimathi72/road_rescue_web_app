import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'

export default function ReverseGeoCoding({position, setLocation}) {
   const [value,setValue] = useState('')
   const [address, setAddress] = useState({})
    const reverseSearch = useCallback(async() =>{
         const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
   const data = await (
      await fetch(GEOCODE_URL + `${position[1]},${position[0]}`)
    ).json();
    console.log(data)
    setValue(`${data["address"]["District"]}, ${data["address"]["Region"]}`);
    setAddress((prev) => ({
      ...prev,
      "location_attributes": {
        "latitude": position[0],
        "longitude": position[1],
        "district": data['address']['District'],
        "city": data["address"]["City"]
      },
    }));
    },[position])
    useEffect(()=>{
        console.log(position)
        reverseSearch();
    },[reverseSearch,position])
  return (
    <div>
        <p>Your Current geo-location: {!!value && value}</p>
        <Button onClick={async(e)=>{
                console.log(address)
                const res = await fetch(`/api/users/${user.id}`, {
                    method: "PUT", 
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
                        "Content-Type": 'application/json'
                    }, body: JSON.stringify({user: address})
                })

                    const data = await res.json()
                    console.log(data)
            }
            
            }>Update Location</Button>
    </div>
  )
}

import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'

export default function ReverseGeoCoding({position, setAddress}) {
   const [value,setValue] = useState('')
   
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
    </div>
  )
}

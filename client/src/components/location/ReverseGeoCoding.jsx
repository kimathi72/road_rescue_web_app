import React, { useCallback, useEffect, useState } from 'react'

export default function ReverseGeoCoding({position}) {
    const [address, setAddress] = useState({})
    const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
    const reverseSearch = useCallback(async() =>{
        const data = await (await fetch(GEOCODE_URL + `${position[1]},${position[0]}`)).json()
        setAddress({
            place: data['PlaceName'],
            lat: position[0],
            long: position,
            district: data ['District'],
            city: data ['City'], 
            region:data ['Region'],
            country: data ['CntryName']
        })
    },[position])
    useEffect(()=>{
        reverseSearch();
    },[reverseSearch])
  return (
    <div>
        <p>Your location: {!!address && address.place}</p>
    </div>
  )
}

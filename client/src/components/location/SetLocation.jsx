import React, { useCallback, useEffect, useState } from "react";
import { Modal, Box ,  FormControl, Button} from "@mui/material";
import Map from "./Map";
import Geosearch from "./Geosearch";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';



export default function SetLocation({ setData }) {
  const [position, setPosition] = useState(null);
  const [value, setValue] = useState('')
  const [address, setAddress] = useState({})
  const {place, lat, long, district, city, region, country} = address
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  
};
const reverseSearch = useCallback(async()=>{
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
  const data = await (await fetch(GEOCODE_URL + `${position[1]},${position[0]}`)).json()
  
   setAddress({
              place: data['address']['PlaceName'],
              lat: position[0],
              long: position[1],
              district:  data['address']['District'],
              city: data['address']['City'], 
              region: data['address']['Region'],
              country: data['address']['CntryName']
          })
},[position])
useEffect(()=>{
 !!position && reverseSearch();

},[reverseSearch, position])
useEffect(()=>{
  console.log(address)
},[address])
  return (
    <FormControl fullWidth sx={{ m: 1 }}  variant="outlined">
      {/* <ReverseGeoCoding position={position}/> */}
     <Geosearch setPosition={setPosition} value={value} setValue={setValue}/>
     <Button startIcon={<AddLocationAltIcon/>}>Gps</Button> 
    </FormControl>
  );
}

import React, {useState, useEffect } from "react";
// import icon from "./Constants";
import 'leaflet/dist/leaflet.js';

import {
  MapContainer,
  TileLayer,
  Marker, 
  Popup,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";


export default function Map({position, children}) {

const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "30vh" , width:'40vw'}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          you are here
          lat: {position[0]}
          long: {position[1]}
        </Popup>
      </Marker>
      {children}
    </MapContainer>
  );
}




















import React, {useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker, 
  useMap,
  useMapEvents,
  Popup,
} from "react-leaflet";
import icon from "./Constants";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default function Map() {
    const [position, setPosition] = useState(null);

function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style:'bar',
      marker: {
        icon
      }
    });

    map.addControl(searchControl);
       map.on('geosearch/showlocation', (result) => {
           if (result && result.location) {
             const { x, y } = result.location;
             setPosition([y,x])
             console.log('Longitude:', x, 'Latitude:', y);
           }
         });

    return () => {map.removeControl(searchControl)
      map.off('geosearch/showlocation')
    }
  }, []);

  return null;
}
  
//   function LocationMarker() {

//     const map = useMapEvents({
//       click() {
//         map.locate();
//       },
//       locationfound(e) {
//         setPosition(e.latlng);
//         map.flyTo(e.latlng, map.getZoom());
//       },
//     });Longitude: 36.828842 Latitude: -1.3026148

//     return position === null ? null : (
//       <Marker position={position}>
//         <Popup>You are here</Popup>
//       </Marker>
//     );
//   }
  return (
    <MapContainer
      center={position || [-1.3026148, 36.828842]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "60vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={ position || [-1.3026148, 36.828842]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <LeafletgeoSearch/>
      {/* <LocationMarker /> */}
    </MapContainer>
  );
}

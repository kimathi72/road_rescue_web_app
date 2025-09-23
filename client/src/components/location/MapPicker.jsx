import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPicker({
  name = "location_attributes",
  initialPosition = [-1.286389, 36.817223], // Nairobi
  initialZoom = 13,
  onChange,
}) {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("");

  // notify parent if they passed onChange
  useEffect(() => {
    if (typeof onChange === "function") {
      onChange({ ...coords, address });
    }
  }, [coords, address, onChange]);

  // reverse geosearch when coords change
  useEffect(() => {
    async function fetchAddress() {
      if (!coords) return;

      try {
         const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
         const data = await (
      await fetch(GEOCODE_URL + `${coords.lng},${coords.lat}`)
    ).json();
    console.log(data)
        const provider = new OpenStreetMapProvider();
        const results = await provider.search({
          query: `${coords.lat},${coords.lng}`,
        });
        if ("address" in data){
          setAddress(
            {
              "district": ( !!data['address']['Placename'] && data['address']['Placename']) || (!!data['address']['Address'] && data['address']['Address']) || (!!data["address"]["ShortLabel"] && data["address"]["ShortLabel"]) || (!!data['address']['LongLabel'] && data['address']['LongLabel']),
              "city": data["address"]["City"],
              "latitude": coords.lat ,
              "longitude": coords.lng
          }
          )
        }else if (results && results.length > 0) {
          console.log(results)
          setAddress(
            {
              "district": results[0].label,
              "city": data["address"]["City"],
              "latitude": coords.lat ,
              "longitude": coords.lng
          }
        );
        } else {
          setAddress({
              "district":  data['address']['district'],
              "city": data["address"]["City"],
              "latitude": coords.lat ,
              "longitude": coords.lng
          });
        }
      } catch (err) {
        console.error("Reverse geocoding failed:", err);
        setAddress({
              "latitude": coords.lat ,
              "longitude": coords.lng
          });
      }
    }

    fetchAddress();
  }, [coords]);

  // Search control inside the map
  function SearchControlComponent() {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        autoComplete: true,
        autoCompleteDelay: 250,
        showMarker: false,
        showPopup: false,
        keepResult: true,
      });

      map.addControl(searchControl);

      const handleShowLocation = (result) => {
        const loc = result?.location;
        if (loc) {
          setCoords({ lat: loc.y, lng: loc.x });
          map.setView([loc.y, loc.x], Math.max(map.getZoom(), 14));
        }
      };

      map.on("geosearch/showlocation", handleShowLocation);

      return () => {
        map.off("geosearch/showlocation", handleShowLocation);
        map.removeControl(searchControl);
      };
    }, [map]);

    return null;
  }

  // Marker that updates on click
  function ClickMarker() {
    useMapEvents({
      click(e) {
        setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return coords ? <Marker position={[coords.lat, coords.lng]} /> : null;
  }

  return (
    <div>
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        scrollWheelZoom={true}
        style={{ height: 320, width: "100%", borderRadius: 8 }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControlComponent />
        <ClickMarker />
      </MapContainer>

      {/* Hidden field for form submission */}
      <input
        type="hidden"
        name={name}
        value={
          coords ? JSON.stringify(address) : ""
        }
        readOnly
      />

      {/* Visible summary */}
      {coords ? (
        <p style={{ marginTop: 8, fontSize: 14, color: "#374151" }}>
          Location: 
          {address ? `📍 ${address['district']}` : "Locating..."} <br />
          ({coords.lat.toFixed(5)}, {coords.lng.toFixed(5)})
        </p>
      ) : (
        <p style={{ marginTop: 8, fontSize: 14, color: "#6B7280" }}>
          Click the map or use the search box to choose a location
        </p>
      )}
    </div>
  );
}

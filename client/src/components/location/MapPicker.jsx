import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Box
} from "@mui/material";

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// Strict Kenya bounding box
const KENYA_BOUNDS = {
  minLng: 33.501,
  maxLng: 42.283,
  minLat: -5.202,
  maxLat: 5.506
};
function isInsideKenya(lat, lng) {
  return (
    lng >= KENYA_BOUNDS.minLng &&
    lng <= KENYA_BOUNDS.maxLng &&
    lat >= KENYA_BOUNDS.minLat &&
    lat <= KENYA_BOUNDS.maxLat
  );
}

export default function MapPicker({
  name = "location_attributes",
  initialPosition = [-1.286389, 36.817223],
  initialZoom = 13,
  onChange
}) {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const provider = new OpenStreetMapProvider();

  // Reverse geocode
  useEffect(() => {
    if (!coords) return;
    setIsGeocoding(true);

    (async () => {
      try {
        const { lat, lng } = coords;
        if (!isInsideKenya(lat, lng)) {
          setAddress("");
          setIsGeocoding(false);
          return;
        }

        const results = await provider.search({ query: `${lat},${lng}` });
        const result = results.find(r => isInsideKenya(r.y, r.x));

        if (result) {
          setAddress({ district: result.label, latitude: lat, longitude: lng });
        } else {
          setAddress({
            district: "Unknown location (Kenya-only filter)",
            latitude: lat,
            longitude: lng
          });
        }
      } catch (err) {
        console.error("Geocode failed:", err);
      }
      setIsGeocoding(false);
    })();
  }, [coords]);

  // Notify parent
  useEffect(() => {
    if (typeof onChange === "function") onChange({ coords, address });
  }, [coords, address]);

  // Search control
  function SearchControlComponent() {
    const map = useMap();
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        autoComplete: true,
        autoCompleteDelay: 200,
        showMarker: false,
        keepResult: false
      });
      map.addControl(searchControl);

      map.on("geosearch/showlocation", result => {
        const loc = result?.location;
        if (!loc) return;
        const { y: lat, x: lng } = loc;
        if (!isInsideKenya(lat, lng)) return;
        setCoords({ lat, lng });
        map.setView([lat, lng], 15);
      });

      return () => map.removeControl(searchControl);
    }, []);
    return null;
  }

  // Click + draggable marker
  function ClickMarker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (!isInsideKenya(lat, lng)) return;
        setCoords({ lat, lng });
      }
    });
    return coords ? (
      <Marker
        position={[coords.lat, coords.lng]}
        draggable
        eventHandlers={{
          dragend: e => {
            const { lat, lng } = e.target.getLatLng();
            if (isInsideKenya(lat, lng)) setCoords({ lat, lng });
          }
        }}
      >
        <Popup>{address?.district || "Selected location"}</Popup>
      </Marker>
    ) : null;
  }

  // Buttons
  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      if (isInsideKenya(lat, lng)) setCoords({ lat, lng });
    });
  };
  const clearLocation = () => {
    setCoords(null);
    setAddress("");
  };

  return (
    <div style={{ marginBottom: 10 }}>
      {/* Hidden input */}
      <input
        type="hidden"
        name={name}
        value={coords ? JSON.stringify(address) : ""}
        readOnly
      />

      {/* Display section */}
      {coords ? (
        <Card variant="outlined" sx={{ mb: 1 }}>
          <CardContent>
            <p>📍 {address?.district}</p>

            <Box
              sx={{
                height: 120,
                borderRadius: 1,
                overflow: "hidden",
                mb: 1
              }}
            >
              <MapContainer
                center={[coords.lat, coords.lng]}
                zoom={14}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[coords.lat, coords.lng]} />
              </MapContainer>
            </Box>

            <Button variant="contained" size="small" onClick={() => setIsOpen(true)}>
              📍 Change Location
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={clearLocation}
              sx={{ ml: 1 }}
            >
              ❌ Clear
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Choose on Map
        </Button>
      )}

      {/* Map Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Pick Location</DialogTitle>
        <DialogContent>
          {isGeocoding && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          <Box sx={{ height: 350, borderRadius: 1, overflow: "hidden" }}>
            <MapContainer
              center={coords ? [coords.lat, coords.lng] : initialPosition}
              zoom={14}
              scrollWheelZoom
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <SearchControlComponent />
              <ClickMarker />
            </MapContainer>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button fullWidth variant="contained" onClick={useCurrentLocation}>
              📍 Use My Location
            </Button>
            <Button fullWidth variant="outlined" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

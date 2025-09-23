// RequestMap.jsx
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";

// custom provider icon
const providerIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

function AnimatedProviderMarker({ providerLocation }) {
  const markerRef = useRef(null);
  const animRef = useRef(null);

  // Animate with Leaflet directly (no React state updates per frame)
  useEffect(() => {
    const marker = markerRef.current;
    if (!providerLocation || !marker) return;

    // Get current position from marker; fallback to providerLocation if marker not placed yet
    const startLatLng = marker.getLatLng ? marker.getLatLng() : L.latLng(providerLocation[0], providerLocation[1]);
    const [endLat, endLng] = providerLocation;

    const frames = 30;
    let frame = 0;

    const step = () => {
      frame++;
      const t = frame / frames;
      const lat = startLatLng.lat + (endLat - startLatLng.lat) * t;
      const lng = startLatLng.lng + (endLng - startLatLng.lng) * t;
      marker.setLatLng([lat, lng]);
      if (frame < frames) {
        animRef.current = requestAnimationFrame(step);
      }
    };

    // start animation
    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [providerLocation]);

  // Initial marker position prop so Leaflet creates marker at providerLocation
  return <Marker position={providerLocation} icon={providerIcon} ref={markerRef} />;
}

export default function RequestMap({ requestLocation, providerLocation, onRouteInfo }) {
  const prevRouteRef = useRef({ distanceKm: null, etaMin: null });

  // compute route info (distance + ETA) but only call onRouteInfo when values change
  useEffect(() => {
    if (!requestLocation || !providerLocation) return;

    const [rlat, rlng] = requestLocation;
    const [plat, plng] = providerLocation;

    const distance = L.latLng(rlat, rlng).distanceTo(L.latLng(plat, plng)); // meters
    const distanceKm = (distance / 1000).toFixed(2);
    const etaMin = Math.round((distance / 1000) / 40 * 60); // crude ETA

    const prev = prevRouteRef.current;
    if (prev.distanceKm !== distanceKm || prev.etaMin !== etaMin) {
      prevRouteRef.current = { distanceKm, etaMin };
      onRouteInfo?.({ distanceKm, etaMin });
    }
  }, [requestLocation, providerLocation, onRouteInfo]);

  if (!requestLocation) return null;

  return (
    <MapContainer center={requestLocation} zoom={14} style={{ height: 400, width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* request marker */}
      <Marker position={requestLocation} />

      {/* provider animated marker */}
      {providerLocation && <AnimatedProviderMarker providerLocation={providerLocation} />}

      {/* simple polyline */}
      {providerLocation && <Polyline positions={[providerLocation, requestLocation]} color="blue" />}
    </MapContainer>
  );
}

import React, { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

// Custom icons
const driverIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const responderIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

// Simple linear interpolation
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Animated marker (for live location)
function AnimatedMarker({ position, icon, duration = 1000 }) {
  const markerRef = useRef(null);
  const animRef = useRef(null);
  const lastTargetRef = useRef(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!position || !marker) return;

    const [targetLat, targetLng] = position;
    const last = lastTargetRef.current;
    if (last && last[0] === targetLat && last[1] === targetLng) return;
    lastTargetRef.current = [targetLat, targetLng];

    const start = marker.getLatLng ? marker.getLatLng() : L.latLng(targetLat, targetLng);
    const startLat = start.lat;
    const startLng = start.lng;

    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(1, elapsed / Math.max(1, duration));

      const lat = lerp(startLat, targetLat, t);
      const lng = lerp(startLng, targetLng, t);
      marker.setLatLng([lat, lng]);

      if (t < 1) animRef.current = requestAnimationFrame(step);
      else animRef.current = null;
    }

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
    };
  }, [position, duration]);

  return position ? <Marker position={position} icon={icon} ref={markerRef} /> : null;
}

// Optional: auto-fit bounds when points change
function FitBounds({ points, padding = [40, 40], enabled = true }) {
  const map = useMap();
  useEffect(() => {
    if (!enabled || !map) return;
    const validPoints = points.filter(Boolean).map(([lat, lng]) => L.latLng(lat, lng));
    if (!validPoints.length) return;

    if (validPoints.length === 1) map.setView(validPoints[0], map.getZoom());
    else map.fitBounds(L.latLngBounds(validPoints).pad(0.1), { padding });
  }, [map, points, enabled, JSON.stringify(points)]);
  return null;
}

// Main component
export default function RequestMap({
  requestLocation,         // [lat, lng] of the request
  driverLocation = null,   // [lat, lng] of driver (static)
  responderLocation = null, // [lat, lng] of responder (live updates)
  showPolyline = true,
  onRouteInfo = null,      // callback({ distanceKm, etaMin })
  fitBoundsOnChange = true,
  animationDurationMs = 1000,
  height = 400,
  tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
}) {
  const prevRouteRef = useRef({ distanceKm: null, etaMin: null });

  // Compute distance + ETA only if both locations exist
  useEffect(() => {
    if (!requestLocation || !responderLocation) return;

    const rLatLng = L.latLng(requestLocation[0], requestLocation[1]);
    const resLatLng = L.latLng(responderLocation[0], responderLocation[1]);
    const meters = rLatLng.distanceTo(resLatLng);
    const distanceKm = Number((meters / 1000).toFixed(2));
    const etaMin = Math.round((distanceKm / 40) * 60); // crude ETA

    const prev = prevRouteRef.current;
    if (prev.distanceKm !== distanceKm || prev.etaMin !== etaMin) {
      prevRouteRef.current = { distanceKm, etaMin };
      onRouteInfo?.({ distanceKm, etaMin });
    }
  }, [requestLocation, responderLocation, onRouteInfo]);

  const polylinePositions = useMemo(() => {
    if (!responderLocation) return null;
    return [responderLocation, requestLocation];
  }, [responderLocation, requestLocation]);

  const fitPoints = useMemo(() => {
    const points = [requestLocation];
    if (driverLocation) points.push(driverLocation);
    if (responderLocation) points.push(responderLocation);
    return points;
  }, [requestLocation, driverLocation, responderLocation]);

  return (
    <MapContainer
      center={requestLocation}
      zoom={14}
      scrollWheelZoom
      style={{ height, width: "100%" }}
    >
      <TileLayer url={tileUrl} />

      {/* Request */}
      <Marker position={requestLocation} />

      {/* Driver */}
      {driverLocation && <Marker position={driverLocation} icon={driverIcon} />}

      {/* Responder */}
      {responderLocation && (
        <AnimatedMarker
          position={responderLocation}
          icon={responderIcon}
          duration={animationDurationMs}
        />
      )}

      {/* Polyline */}
      {showPolyline && polylinePositions && (
        <Polyline positions={polylinePositions} color="blue" />
      )}

      {/* Auto-fit */}
      {fitBoundsOnChange && <FitBounds points={fitPoints} enabled={true} />}
    </MapContainer>
  );
}

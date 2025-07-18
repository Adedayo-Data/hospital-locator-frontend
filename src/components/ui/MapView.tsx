// components/ui/MapView.tsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { Hospital } from '@/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Coordinates } from '@/hooks/useUserLocation';


interface Props {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  userLocation?: Coordinates | null;
}

// const userIcon = L.icon({
//   iconUrl: '/icons/user-marker.png',
//   iconSize: [30, 42],
//   iconAnchor: [15, 42],
// });

function FitBounds({ hospitals, userLocation }: Pick<Props, 'hospitals' | 'userLocation'>) {
  const map = useMap();

  useEffect(() => {
    const points: L.LatLngExpression[] = hospitals.map(h => [h.lat, h.lng]);
    if (userLocation) points.push([userLocation.lat, userLocation.lng]);

    if (points.length) map.fitBounds(points as [number, number][], { padding: [40, 40] });
  }, [hospitals, userLocation, map]);

  return null;
}

const MapView: React.FC<Props> = ({ hospitals, selectedHospital, userLocation }) => {
  console.log("📍 userLocation:", userLocation);
  const youAreHereIcon = L.divIcon({
    className: 'you-marker-icon',
    html: '📍',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer
      center={[6.5244, 3.3792]} // default Lagos
      zoom={13}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Hospital markers */}
      {hospitals.map((hospital, index) => (
        <Marker
          key={index}
          position={[hospital.lat, hospital.lng]}
        >
          <Popup>
            <strong>{hospital.name}</strong><br />
            {hospital.location}
          </Popup>
        </Marker>
      ))}

      {/* User location marker */}
      {userLocation && (
      <Marker position={[userLocation.lat, userLocation.lng]} icon={youAreHereIcon}>
        <Popup>
          📍 <strong>You are here</strong>
        </Popup>
      </Marker>
    )}


      {/* Map bounds */}
      <FitBounds hospitals={hospitals} userLocation={userLocation} />

      {/* Fly to selected hospital */}
      {selectedHospital && <FlyToHospital hospital={selectedHospital} />}
    </MapContainer>
  );
};

const FlyToHospital: React.FC<{ hospital: Hospital }> = ({ hospital }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([hospital.lat, hospital.lng], 15, { duration: 1.5 });
  }, [hospital, map]);

  return null;
};

export default MapView;

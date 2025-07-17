// components/ui/MapDisplay.tsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { Hospital } from '@/types';
import 'leaflet/dist/leaflet.css';

interface Props {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
}

const MapView: React.FC<Props> = ({ hospitals, selectedHospital }) => {
  return (
    <MapContainer
      center={[6.5244, 3.3792]} // default center
      zoom={13}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

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

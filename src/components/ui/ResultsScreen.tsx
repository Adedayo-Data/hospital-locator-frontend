// components/ui/ResultsScreen.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapView from './MapView';
import HospitalCard from './HospitalCard';
import type { Hospital } from '@/types';

const ResultsScreen: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [viewingDetails, setViewingDetails] = useState<boolean>(false);

  // Fetch hospitals from backend
  useEffect(() => {
    axios.get<Hospital[]>('http://localhost:8080/api/hospital') // Replace with live URL if deployed
      .then((response) => {
        setHospitals(response.data);
        console.log('Fetched hospitals:', response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch hospitals:', error);
      });
  }, []);

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2">
      {/* Hospital List */}
      <div className="overflow-y-auto p-4 bg-white/80 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-4">Nearby Hospitals</h2>
        {hospitals.map((hospital, index) => (
          <div key={hospital.id || index} onClick={() => setSelectedHospital(hospital)}>
            <HospitalCard
              hospital={hospital}
              selected={selectedHospital?.id === hospital.id}
            />
          </div>
        ))}
      </div>

      {/* Map Display */}
      <MapView hospitals={hospitals} selectedHospital={selectedHospital} />
    </div>
  );
};

export default ResultsScreen;

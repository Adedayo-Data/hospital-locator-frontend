// components/ui/ResultsScreen.tsx
import React, { useState } from 'react';
import MapView from './MapView';
import HospitalCard from './HospitalCard';
import type { Hospital } from '@/types';
import { dummyHospitals } from '@/data/DummyData';

const ResultsScreen: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2">
      {/* Hospital List */}
      <div className="overflow-y-auto p-4 bg-white/80 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-4">Nearby Hospitals</h2>
        {dummyHospitals.map((hospital, index) => (
          <div key={index} onClick={() => setSelectedHospital(hospital)}>
            <HospitalCard
              hospital={hospital}
              selected={selectedHospital?.name === hospital.name}
            />
          </div>
        ))}
      </div>

      {/* Map Display */}
      <MapView hospitals={dummyHospitals} selectedHospital={selectedHospital} />
    </div>
  );
};

export default ResultsScreen;

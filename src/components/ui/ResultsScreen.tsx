import React, { useState } from 'react';
import MapView from './MapView';
import HospitalCard from './HospitalCard';
import type { Hospital } from '@/types';
import { Input } from './input';
import { Button } from './button';

interface ResultsScreenProps {
  hospitals: Hospital[];
  loading: boolean;
  onBack: () => void;
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ hospitals, loading, onBack, onSearch, initialQuery = '' }) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [query, setQuery] = useState(initialQuery);

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2">
      {/* Hospital List */}
      <div className="overflow-y-auto p-4 bg-white/80 backdrop-blur-md">
        <div className="flex items-center mb-4">
          <Button onClick={onBack} className="mr-2">Back</Button>
          <Input
            type="text"
            placeholder="Search again..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
            className="flex-grow"
          />
          <Button onClick={() => onSearch(query)} className="ml-2">Search</Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        {loading ? (
          <p>Loading...</p>
        ) : hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div key={hospital.id} onClick={() => setSelectedHospital(hospital)}>
              <HospitalCard
                hospital={hospital}
                selected={selectedHospital?.id === hospital.id}
              />
            </div>
          ))
        ) : (
          <p>No hospitals found.</p>
        )}
      </div>

      {/* Map Display */}
      <MapView hospitals={hospitals} selectedHospital={selectedHospital} />
    </div>
  );
};

export default ResultsScreen;

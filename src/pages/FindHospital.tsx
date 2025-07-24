// pages/FindHospital.tsx
import React, { useState } from 'react';
import SearchScreen from '@/components/ui/SearchScreen';
import ResultsScreen from '@/components/ui/ResultsScreen';

const FindHospital: React.FC = () => {
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {!hasSearched ? (
        <SearchScreen onSearch={() => setHasSearched(true)} />
      ) : (
        <ResultsScreen />
      )}
    </div>
  );
};

export default FindHospital;

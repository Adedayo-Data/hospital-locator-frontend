import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchScreen from '@/components/ui/SearchScreen';
import ResultsScreen from '@/components/ui/ResultsScreen';
import type { Hospital } from '@/types';

const FindHospital: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query');

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery });
  };

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios.get<Hospital[]>(`http://localhost:8080/api/hospital/search?query=${query}`)
        .then((response) => {
          setHospitals(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch hospitals:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  const handleBack = () => {
    navigate('/'); // Navigate back to the homepage
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      {query ? (
        <ResultsScreen
          hospitals={hospitals}
          loading={loading}
          onBack={handleBack}
          onSearch={handleSearch} // Pass the handleSearch function to ResultsScreen
          initialQuery={query}
        />
      ) : (
        <SearchScreen onSearch={handleSearch} />
      )}
    </div>
  );
};

export default FindHospital;

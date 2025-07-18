// hooks/useRoute.ts
import { useState } from 'react';
import axios from 'axios';

export const useRoute = () => {
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [routeError, setRouteError] = useState<string | null>(null);

  const getRoute = async (from: [number, number], to: [number, number]) => {
    try {
      const res = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          coordinates: [from, to],
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_ORS_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      const coords = res.data.features[0].geometry.coordinates;
      setRouteCoords(coords);
      setRouteError(null);
    } catch (err) {
      setRouteError('Failed to fetch route');
      setRouteCoords([]);
    }
  };

  return {
    routeCoords,
    routeError,
    getRoute,
  };
};

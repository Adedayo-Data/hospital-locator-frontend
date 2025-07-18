// hooks/useUserLocation.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export type Coordinates = {
  lat: number;
  lng: number;
};

export const useUserLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [manualAddress, setManualAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 📍 Try getting browser location
  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }
}, []);

  // 🔄 Convert manual address to coordinates
  const geocodeAddress = async () => {
    if (!manualAddress) return;
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(manualAddress)}&format=json&limit=1`
      );
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setError(null);
      } else {
        setError('Address not found.');
      }
    } catch {
      setError('Failed to geocode address.');
    }
  };

  return {
    location,
    error,
    manualAddress,
    setManualAddress,
    geocodeAddress,
  };
};

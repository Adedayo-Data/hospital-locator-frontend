// components/ui/SearchScreen.tsx
import React from "react";
import MapView from "./MapView";

const dummyHospitals = [
  {
    id: 1,
    name: "General Hospital Ikeja",
    location: "Ikeja, Lagos",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589758438368-7a1e5fbf7d84?fit=crop&w=600&q=80",
    lat: 6.6018,
    lng: 3.3515
  },
];

type Props = {
  onSearch: () => void;
};

const SearchScreen: React.FC<Props> = ({ onSearch }) => {
  return (
    <div className="relative h-full w-full">
      {/* Blurred Map in Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="h-full w-full filter blur-sm brightness-75">
          <MapView hospitals={dummyHospitals} selectedHospital={null} />
        </div>
      </div>

      {/* Search Box Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Find a Hospital Near You
          </h1>
          <input
            type="text"
            placeholder="Enter hospital name or location"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={onSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;

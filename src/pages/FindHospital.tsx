// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { dummyHospitals } from "@/data/DummyData";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Import the icon images directly (✅ ES Module compatible)
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// // Custom icon setup
// const customHospitalIcon = L.icon({
//   iconUrl,
//   iconRetinaUrl,
//   shadowUrl,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// export default function FindHospitals() {
//   return (
//     <div className="h-screen w-full">
//       <MapContainer
//         center={[6.5244, 3.3792]} // Lagos
//         zoom={11}
//         scrollWheelZoom={true}
//         className="h-full w-full z-0"
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {dummyHospitals.map((hospital, index) => (
//           <Marker
//             key={index}
//             position={[hospital.lat, hospital.lng]}
//             icon={customHospitalIcon}
//           >
//             <Popup>
//               <div>
//                 <h3 className="font-bold">{hospital.name}</h3>
//                 <p>{hospital.location}</p>
//                 <p>⭐ {hospital.rating}</p>
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { dummyHospitals } from "@/data/DummyData";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// const customHospitalIcon = L.icon({
//   iconUrl,
//   iconRetinaUrl,
//   shadowUrl,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// export default function FindHospitals() {
//   const [mode, setMode] = useState<"search" | "results" | "details">("search");
//   const [query, setQuery] = useState("");

//   const handleSearch = () => {
//     // fake delay/search logic
//     setMode("results");
//   };

//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       {/* === MAP (Always Showing) === */}
//       <MapContainer
//         center={[6.5244, 3.3792]}
//         zoom={11}
//         scrollWheelZoom={true}
//         className={`h-full w-full z-0 transition-all duration-700 ${
//           mode === "search" ? "blur-sm brightness-75" : ""
//         }`}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {dummyHospitals.map((hospital, index) => (
//           <Marker
//             key={index}
//             position={[hospital.lat, hospital.lng]}
//             icon={customHospitalIcon}
//           >
//             <Popup>
//               <div>
//                 <h3 className="font-bold">{hospital.name}</h3>
//                 <p>{hospital.location}</p>
//                 <p>⭐ {hospital.rating}</p>
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>

//       {/* === SEARCH OVERLAY === */}
//       {mode === "search" && (
//         <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center">
//           <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-[90%] max-w-md text-center space-y-4">
//             <h2 className="text-xl font-semibold">Find Nearby Hospitals</h2>
//             <input
//               type="text"
//               placeholder="Enter address or city..."
//               className="w-full px-4 py-2 border rounded-md"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       )}

//       {/* === SIDE PANEL FOR RESULTS === */}
//       {mode === "results" && (
//         <div className="absolute top-0 right-0 h-full w-[30%] bg-white bg-opacity-95 z-10 p-4 overflow-y-auto">
//           <h2 className="text-lg font-bold mb-4">Hospitals Found</h2>
//           {dummyHospitals.map((hospital, index) => (
//             <div
//               key={index}
//               className="border-b py-2 cursor-pointer hover:bg-gray-100 rounded-md px-2"
//               onClick={() => setMode("details")}
//             >
//               <h3 className="font-semibold">{hospital.name}</h3>
//               <p className="text-sm">{hospital.location}</p>
//               <p className="text-xs text-gray-500">⭐ {hospital.rating}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// pages/FindHospital.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
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

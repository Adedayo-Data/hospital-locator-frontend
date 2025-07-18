import { useParams } from 'react-router-dom';
import { dummyHospitals } from '@/data/DummyData';
import MapView from '@/components/ui/MapView';
import type { Hospital } from '@/types';
import Navbar from '@/components/ui/Navbar';
import heroImage from "@/assets/hero-image.jpg"


const HospitalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const hospital = dummyHospitals.find((h) => h.id === Number(id)) as Hospital | undefined;

  if (!hospital) return <div className="text-center p-8 text-red-500">Hospital not found</div>;

  return (
    <>
      <Navbar />
      <div className="pt-24 px-4 max-w-7xl mx-auto space-y-10">
      <div className="p-6 max-w-7xl mx-auto space-y-10">
        {/* 🖼️ Hospital Image */}
        <div className="relative w-full h-[28rem] md:h-[32rem] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <img
          src={hospital.image || heroImage}
          alt={hospital.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
          <h1 className="text-white text-2xl font-bold">{hospital.name}</h1>
          <p className="text-white text-sm">{hospital.location}</p>
        </div>
      </div>



        {/* 🏥 Hospital Info */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-blue-700">{hospital.name}</h1>
          <p className="text-gray-500">📍 {hospital.location}</p>
          <p className="text-gray-600">{hospital.description || 'No description available.'}</p>
        </div>

        {/* ℹ️ Extra Details (Dummy) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div className="space-y-2">
            <p><strong>Specialties:</strong> {hospital.specialties?.join(', ') || 'General Healthcare'}</p>
            <p><strong>Opening Hours:</strong> {hospital.hours || 'Open 24/7'}</p>
            <p><strong>Emergency Unit:</strong> {hospital.emergency ? '✅ Available' : '❌ Not Available'}</p>
          </div>
          <div className="space-y-2">
            <p><strong>Phone:</strong> {hospital.phone}</p>
            <p><strong>Email:</strong> {hospital.email || 'N/A'}</p>
            <p><strong>Website:</strong> 
              {hospital.website ? (
                <a href={hospital.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {hospital.website}
                </a>
              ) : 'N/A'}
            </p>
          </div>
        </div>

        {/* 🗺️ Map + Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 w-full rounded-xl overflow-hidden shadow">
            <MapView hospitals={[hospital]} selectedHospital={hospital} />
          </div>

          {/* 🔘 Actions */}
          <div className="space-y-4 p-6 border rounded-xl shadow-md bg-white">
            <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
            <a
              href={`tel:${hospital.phone}`}
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              📞 Call Hospital
            </a>
            <button
              onClick={() => console.log("Route from current location")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              🧭 Get Directions
            </button>
          </div>
        </div>
      </div>
      {/* Closing tag added for the outer div */}
    </div>
    </>
  );
};

export default HospitalDetail;

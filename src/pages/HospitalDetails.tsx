// pages/HospitalDetail.tsx (or wherever your detail component lives)
import { useParams } from 'react-router-dom';
import { dummyHospitals } from '@/data/DummyData';
import MapView from '@/components/ui/MapView'; // ✅ Import the real MapView
import type { Hospital } from '@/types';

const HospitalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const hospital = dummyHospitals.find((h) => h.id === Number(id)) as Hospital | undefined;


  if (!hospital) return <div>Hospital not found</div>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{hospital.name}</h1>
      <p className="text-gray-700">{hospital.description || hospital.location}</p>

      {/* 🗺️ MapView needs to receive an array (even if one hospital) and the selected hospital */}
      <div className="h-96">
        <MapView hospitals={[hospital]} selectedHospital={hospital} />
      </div>

      {/* 📞 Call Button */}
      <a
        href={`tel:${hospital.phone}`}
        className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Call Now
      </a>
    </div>
  );
};

export default HospitalDetail;

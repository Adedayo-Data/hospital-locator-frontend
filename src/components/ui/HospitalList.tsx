import { useState } from 'react';
import HospitalCard from '@/components/ui/HospitalCard';
import ViewDetailsModal from '@/components/ui/ViewDetailsModal';
import type { Hospital } from '@/types';

const HospitalList = ({ hospitals }: { hospitals: Hospital[] }) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (hospital: Hospital) => {
    setSelectedHospital(hospital);  // triggers fly-to
    setShowModal(true);             // triggers modal
  };

  return (
    <div className="overflow-y-auto p-4 bg-white/80 backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-4">Nearby Hospitals</h2>
      
      {hospitals.map((hospital, index) => (
        <HospitalCard
          key={index}
          hospital={hospital}
          selected={selectedHospital?.name === hospital.name}
          onClick={() => handleClick(hospital)}  // now click does both things
        />
      ))}

      {/* Modal */}
      {showModal && selectedHospital && (
        <ViewDetailsModal
          hospital={selectedHospital}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default HospitalList;

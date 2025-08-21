// components/ui/HospitalCard.tsx
import React from 'react';
import type { Hospital } from '@/types';
import { useNavigate } from 'react-router-dom';

interface HospitalCardProps {
  hospital: Hospital;
  selected?: boolean;
  onClick?: (hospital: Hospital) => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, selected, onClick }) => {
  const navigate = useNavigate();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/hospital/${hospital.id}`);
  };

  return (
    <div
      onClick={() => onClick?.(hospital)}
      className={`p-4 mb-3 rounded-xl shadow-md cursor-pointer transition-all duration-200 border-2 ${
        selected ? 'border-blue-500 bg-blue-100' : 'border-transparent bg-white'
      }`}
    >
      <h3 className="text-lg font-bold">{hospital.hospitalName}</h3>
      <p className="text-sm text-gray-600">{hospital.location}</p>

      <div className="mt-3 flex items-center gap-2">
        {/* View Details */}
        <button
          onClick={handleViewDetails}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </button>

        {/* Call */}
        <a
          href={`tel:${hospital.phone || ''}`}
          className="text-sm px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={(e) => e.stopPropagation()}
        >
          Call
        </a>
      </div>
    </div>
  );
};

export default HospitalCard;

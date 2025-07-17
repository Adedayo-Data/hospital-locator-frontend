// components/ui/HospitalCard.tsx
import React from 'react';
import type { Hospital } from '@/types';

interface Props {
  hospital: Hospital;
  selected?: boolean;
  onViewDetails?: (hospital: Hospital) => void; // new prop
}

const HospitalCard: React.FC<Props> = ({ hospital, selected, onViewDetails }) => {
  return (
    <div
      className={`p-4 mb-3 rounded-xl shadow-md cursor-pointer transition-all duration-200 border-2 ${
        selected ? 'border-blue-500 bg-blue-100' : 'border-transparent bg-white'
      }`}
    >
      <h3 className="text-lg font-bold">{hospital.name}</h3>
      <p className="text-sm text-gray-600">{hospital.location}</p>

      <div className="mt-3 flex items-center gap-2">
        {/* View Details */}
        <button
          onClick={() => onViewDetails?.(hospital)}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </button>

        {/* Call */}
        <a
          href={`tel:${hospital.phone || ''}`}
          className="text-sm px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Call
        </a>
      </div>
    </div>
  );
};

export default HospitalCard;

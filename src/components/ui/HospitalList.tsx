// components/HospitalCard.tsx
import React from "react";

type Hospital = {
  id: string;
  name: string;
  address: string;
  rating?: number;
};

type Props = {
  hospital: Hospital;
  onClick: () => void;
};

const HospitalCard: React.FC<Props> = ({ hospital, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-4 border rounded-xl shadow-md hover:shadow-lg transition-all mb-2 bg-white"
    >
      <h2 className="text-lg font-bold">{hospital.name}</h2>
      <p className="text-sm text-gray-600">{hospital.address}</p>
      {hospital.rating && (
        <p className="text-xs text-yellow-500 mt-1">⭐ {hospital.rating}/5</p>
      )}
    </div>
  );
};

export default HospitalCard;

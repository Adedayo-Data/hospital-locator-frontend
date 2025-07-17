// components/ui/ViewDetailsModal.tsx
import React from 'react';
import type { Hospital } from '@/types';

interface Props {
  hospital: Hospital;
  onClose: () => void;
}

const ViewDetailsModal: React.FC<Props> = ({ hospital, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-2">{hospital.name}</h2>
        <p className="text-sm text-gray-600 mb-1">{hospital.location}</p>
        <p className="text-sm text-gray-600 mb-3">Phone: {hospital.phone}</p>

        <div className="mt-4">
          {/* Placeholder for extra info (rating, services, etc) */}
          <p className="text-gray-800">
            <strong>Services:</strong> {hospital.services?.join(', ') || 'Not listed'}
          </p>
          <p className="text-gray-800 mt-2">
            <strong>Rating:</strong> {hospital.rating || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;

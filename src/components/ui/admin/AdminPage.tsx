import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HospitalCard from './HospitalCard';
import HospitalForm from './HospitalForm';

import { Button } from '@/components/ui/button';
import type { Hospital } from '@/types';

const AdminPage: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hospital");
      setHospitals(response.data);
    } catch (err) {
      console.error("Failed to load hospitals", err);
    }
  };

  const handleEdit = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this hospital?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/hospital/${id}`);
      setHospitals(prev => prev.filter(h => h.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingHospital(null);
    fetchHospitals();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>
        <Button onClick={() => setShowForm(true)} className="bg-green-600 text-white">+ Add Hospital</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {hospitals.map(hospital => (
          <HospitalCard
            key={hospital.id}
            hospital={hospital}
            onEdit={() => handleEdit(hospital)}
            onDelete={() => handleDelete(hospital.id)}
          />
        ))}
      </div>

      {showForm && (
        <HospitalForm
          onClose={handleFormClose}
          existing={editingHospital}
        />
      )}
    </div>
  );
};

export default AdminPage;

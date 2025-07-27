    import React, { useState, useEffect, useRef } from 'react';
    import type { Hospital } from '@/types';
    import axios from 'axios';
    import { X } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import toast from 'react-hot-toast';

    interface Props {
    existing?: Hospital | null;
    onClose: () => void;
    onSuccess?: () => void; // Optional callback for success
    }

    const defaultHospital: Hospital = {
    id: 0,
    name: '',
    location: '',
    rating: 0,
    image: '',
    lat: 0,
    lng: 0,
    phone: '',
    services: [],
    description: '',
    specialties: [],
    hours: '',
    emergency: false,
    email: '',
    website: '',
    };

    const HospitalForm: React.FC<Props> = ({ existing, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<Hospital>(defaultHospital);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10); // animation delay
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !(modalRef.current as any).contains(event.target)) {
            onClose(); // close modal on outside click
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
    if (existing) {
        setFormData({
        ...defaultHospital,
        ...existing,
        });
    } else {
        setFormData(defaultHospital); // Reset to blank form if creating new
    }
    }, [existing]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: ['rating', 'lat', 'lng'].includes(name)
            ? parseFloat(value)
            : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        if (existing) {
            await axios.put(`http://localhost:8080/api/hospital/${existing.id}`, formData);
        } else {
            await axios.post('http://localhost:8080/api/hospitals', formData);
        }
        toast.success(`Hospital ${existing ? "updated" : "created"} successfully!`);
        onSuccess?.(); // Call success callback if provided
        onClose();
        } catch (err) {
        console.error('Form submit failed', err);
        }
    };

  return (
    <div className="transition-all duration-300 ease-in-out">
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 w-[90vw] h-[90vh] max-w-5xl overflow-y-auto relative shadow-xl">
            <div
            ref={modalRef}
            className={`bg-white rounded-2xl p-8 w-[90vw] h-[90vh] max-w-5xl overflow-y-auto relative shadow-xl transform transition-all duration-300 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            >
            <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
            <X size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">{existing ? 'Edit' : 'Add'} Hospital</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

            <Input name="name" placeholder="Hospital Name" value={formData.name} onChange={handleChange} />
            <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
            <Input name="rating" type="number" placeholder="Rating" value={formData.rating} onChange={handleChange} />
            <Input name="lat" type="number" placeholder="Latitude" value={formData.lat} onChange={handleChange} />
            <Input name="lng" type="number" placeholder="Longitude" value={formData.lng} onChange={handleChange} />
            <Input name="phone" placeholder="Phone" value={formData.phone ?? ''} onChange={handleChange} />
            <Input name="email" placeholder="Email" value={formData.email ?? ''} onChange={handleChange} />
            <Input name="website" placeholder="Website" value={formData.website ?? ''} onChange={handleChange} />
            <Input
                name="services"
                placeholder="Services (comma separated)"
                value={formData.services?.join(', ') ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, services: e.target.value.split(',').map(s => s.trim()) })
                }
            />
            <Input
                name="specialties"
                placeholder="Specialties (comma separated)"
                value={formData.specialties?.join(', ') ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, specialties: e.target.value.split(',').map(s => s.trim()) })
                }
            />
            <Input name="hours" placeholder="Operating Hours" value={formData.hours ?? ''} onChange={handleChange} />

            <Textarea
                name="description"
                placeholder="Hospital Description"
                value={formData.description ?? ''}
                onChange={handleChange}
            />

            <div className="flex items-center space-x-2">
                <input
                type="checkbox"
                id="emergency"
                checked={formData.emergency ?? false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, emergency: e.target.checked })
                }
                />
                <label htmlFor="emergency" className="text-sm text-gray-700">
                24/7 Emergency Available
                </label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white">
                {existing ? 'Update' : 'Create'} Hospital
            </Button>
            </form>
        </div>
        </div>
    </div>    
    </div>
  );
};

export default HospitalForm;

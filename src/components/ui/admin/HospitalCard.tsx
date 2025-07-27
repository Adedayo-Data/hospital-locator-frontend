import React from 'react';
import type { Hospital } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  hospital: Hospital;
  onEdit: () => void;
  onDelete: () => void;
}

const HospitalCard: React.FC<Props> = ({ hospital, onEdit, onDelete }) => {
  return (
    <Card className="rounded-2xl shadow-md p-4 flex flex-col justify-between">
      <CardContent>
        <h2 className="text-xl font-semibold text-blue-800">{hospital.name}</h2>
        <p className="text-sm text-gray-600">{hospital.location}</p>
        <p className="text-sm text-gray-600">Phone: {hospital.phone}</p>
        {/* <p className="text-sm text-gray-600">Type: {hospital.type}</p> */}
        <p className="text-sm text-gray-600">Rating: {hospital.rating}</p>
      </CardContent>
      <div className="flex gap-2 mt-4">
        <Button size="sm" variant="outline" onClick={onEdit}>
          <Pencil size={16} className="mr-1" /> Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete}>
          <Trash2 size={16} className="mr-1" /> Delete
        </Button>
      </div>
    </Card>
  );
};

export default HospitalCard;

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/admin/Sidebar";
import { HospitalIcon, StarIcon, UsersIcon } from "lucide-react";
import axios from "axios";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    hospitals: 0,
    reviews: 0,
    users: 0,
  });

  useEffect(() => {
    // Fetch data counts from backend
    const fetchStats = async () => {
      try {
        const [hRes, rRes, uRes] = await Promise.all([
          axios.get("http://localhost:8080/api/hospitals/count"),
          axios.get("http://localhost:8080/api/reviews/count"),
          axios.get("http://localhost:8080/api/users/count"),
        ]);

        setStats({
          hospitals: hRes.data,
          reviews: rRes.data,
          users: uRes.data,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard
            title="Hospitals"
            value={stats.hospitals}
            icon={<HospitalIcon className="w-6 h-6 text-blue-600" />}
          />
          <StatCard
            title="Reviews"
            value={stats.reviews}
            icon={<StarIcon className="w-6 h-6 text-yellow-500" />}
          />
          <StatCard
            title="Users"
            value={stats.users}
            icon={<UsersIcon className="w-6 h-6 text-green-600" />}
          />
        </div>
      </main>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Card className="bg-white shadow-md rounded-2xl p-4 flex items-center">
    <div className="bg-gray-100 rounded-full p-3 mr-4">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
    </div>
  </Card>
);

export default AdminDashboard;

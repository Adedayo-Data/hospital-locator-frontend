import React from "react";
import { Home, Settings, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-5">
      <div className="text-2xl font-bold text-blue-600 mb-10">Admin Panel</div>
      <nav className="flex flex-col gap-4">
        <Link to="/admin" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>
        <Link to="/admin/hospitals" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <Home className="w-5 h-5" /> Manage Hospitals
        </Link>
        <Link to="/admin/settings" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </nav>
    </aside>
  );
};

export { Sidebar };

import React from "react";
import { Home, Settings, LayoutDashboard, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // or your actual key
    navigate("/admin/login"); // redirect to login
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-5 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold text-blue-600 mb-10">Admin Panel</div>
        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/admin/hospitals" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Home className="w-5 h-5" /> Manage Hospitals
          </Link>
          <Link to="/admin/manage-users" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Home className="w-5 h-5" /> Manage Users
          </Link>
          <Link to="/admin/manage-reviews" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Home className="w-5 h-5" /> Manage Reviews
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
      </div>

      {/* Logout button at the bottom */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-600 hover:text-red-800 mt-10"
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </aside>
  );
};

export { Sidebar };

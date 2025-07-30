// src/components/ui/admin/AdminNavbar.tsx

import React from "react";
import { UserCircle, Cog } from "lucide-react";

interface AdminNavbarProps {
  title?: string;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ title = "Dashboard" }) => {
  return (
    <header className="w-full flex items-center justify-between bg-white px-6 py-4 shadow-sm sticky top-0 z-20">
      {/* Logo & Title */}
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold text-blue-600">MediMap</div>
        <span className="text-gray-700 font-medium text-lg">{title}</span>
      </div>

      {/* Profile & Settings */}
      <div className="flex items-center space-x-6">
        <Cog className="w-5 h-5 text-gray-600 cursor-pointer" />
        <UserCircle className="w-7 h-7 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
};

export default AdminNavbar;

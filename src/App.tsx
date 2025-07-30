// src/App.tsx
import { Routes, Route } from "react-router-dom";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import HospitalManagement from "./components/ui/admin/HospitalManagement";
import AdminPrivateRoute from "./components/ui/AdminPrivateRoute";

export default function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminPrivateRoute>
            <AdminDashboard />
          </AdminPrivateRoute>
        }
      />
      <Route
        path="/admin/hospitals"
        element={
          <AdminPrivateRoute>
            <HospitalManagement />
          </AdminPrivateRoute>
        }
      />
    </Routes>
  );
}

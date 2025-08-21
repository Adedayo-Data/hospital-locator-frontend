// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import HospitalManagement from "./components/ui/admin/HospitalManagement";
import AdminPrivateRoute from "./components/ui/AdminPrivateRoute";
import FindHospitals from "./pages/FindHospital";
import HospitalDetail from "./pages/HospitalDetails";
import SettingsPage from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path = "/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/find-hospitals" element={<FindHospitals />} />
      <Route path="/hospital/:id" element={<HospitalDetail />} />


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
      <Route
        path="/admin/Settings"
        element={
          <AdminPrivateRoute>
            <SettingsPage />
          </AdminPrivateRoute>
        }
      />
    </Routes>
  );
}

import { BrowserRouter  as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import FindHospitals from "./pages/FindHospital";
import HospitalDetail from "./pages/HospitalDetails";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalManagement from "./components/ui/admin/HospitalManagement";
import Toaster from 'react-hot-toast';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-hospitals" element={<FindHospitals />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/admin/hospitals" element={<HospitalManagement />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}
import { BrowserRouter  as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import FindHospitals from "./pages/FindHospital";
import HospitalDetail from "./pages/HospitalDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-hospitals" element={<FindHospitals />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />

      </Routes>
    </Router>
  );
}
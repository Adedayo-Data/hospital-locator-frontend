import { BrowserRouter  as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import FindHospitals from "./pages/FindHospital";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-hospitals" element={<FindHospitals />} />
      </Routes>
    </Router>
  );
}
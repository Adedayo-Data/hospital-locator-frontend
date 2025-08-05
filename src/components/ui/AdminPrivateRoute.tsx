// src/components/route/AdminPrivateRoute.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AdminPrivateRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }
    // const localToken = localStorage.getItem("token");
    // console.log("Token in localStorage from private Routing 1:", localToken);

    fetch("http://localhost:8080/auth/validate-token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
      console.log("Raw fetch response:", res); // Log the raw Response
      if (!res.ok) throw new Error("Invalid token");
      return res.json(); // Try to parse body as JSON
    })
    .then((isValid: boolean) => {
      console.log("Parsed response body:", isValid); // This should be { valid: true }
      if (isValid) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        navigate("/admin/login");
      }
    })
    .catch((err) => {
      console.error("Error validating token:", err);
      localStorage.removeItem("token");
      navigate("/admin/login");
    })
    .finally(() => {
      setIsLoading(false);
    });
}, [navigate]);


  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? <>{children}</> : null;
};

export default AdminPrivateRoute;

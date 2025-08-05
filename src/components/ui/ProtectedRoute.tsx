// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    // Check token validity with backend
    fetch("http://localhost:8080/API/auth/validate-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Token invalid");
        return res.json();
      })
      .then(data => {
        if (!data.valid) {
          localStorage.removeItem("token");
          navigate("/admin/login");
        }
      })
      .catch(err => {
        console.log("Token invalid or expired:", err);
        localStorage.removeItem("token");
        navigate("/admin/login");
      });
  }, [navigate]);

  return children;
};

export default ProtectedRoute;

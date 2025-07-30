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

    fetch("http://localhost:8080/api/auth/validate-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then(data => {
        if (data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          navigate("/admin/login");
        }
      })
      .catch(() => {
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

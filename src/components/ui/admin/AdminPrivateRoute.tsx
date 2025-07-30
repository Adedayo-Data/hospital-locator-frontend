// src/components/route/AdminPrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface AdminPrivateRouteProps {
  children: React.ReactNode;
}

const AdminPrivateRoute: React.FC<AdminPrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;

// src/context/AdminAuthContext.tsx
import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AuthContextType | null>(null);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        alert("Invalid login credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/admin"); // Redirect to dashboard
    } catch (error) {
      alert("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider value={{ login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

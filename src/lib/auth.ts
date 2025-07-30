// src/lib/auth.ts

export const logout = () => {
  localStorage.removeItem("admin_token");
  window.location.href = "/admin/login";
};

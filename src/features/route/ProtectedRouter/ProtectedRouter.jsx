import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";

export default function ProtectedRouter({ children }) {
  const user = useAuthStore((store) => store.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

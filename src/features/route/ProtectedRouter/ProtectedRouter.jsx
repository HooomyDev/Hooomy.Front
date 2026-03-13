import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import routes from "../../../stores/routes.json";

export default function ProtectedRouter({ roles = ["Resident"], children }) {
  const user = useAuthStore((store) => store.user);

  if (!user) {
    return <Navigate to={routes.login} replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={routes.noAccess} replace />;
  }

  return children;
}

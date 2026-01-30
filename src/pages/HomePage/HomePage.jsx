import React from "react";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import Home from "../../components/Home/Home";
import { useAuthStore } from "../../stores/authStore";
import EmployeeHome from "../../components/EmployeeHome/EmployeeHome";

export default function HomePage() {
  const user = useAuthStore((store) => store.user);

  return (
    <PageWrapper>
      {user?.role === "Employee" ? <EmployeeHome /> : <Home />}
    </PageWrapper>
  );
}

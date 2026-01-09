import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./features/route/ProtectedRouter/ProtectedRouter";
import "./styles/variables.css";
import "./styles/global.css";
import NotFound from "./components/NotFound/NotFound";
import { useEffect } from "react";
import MyRequestsPage from "./pages/MyRequestsPage/MyRequestsPage";
import routes from "./stores/routes.json";
import UserTermsPage from "./pages/UserTermsPage/UserTermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage/CookiesPolicyPage";
import WorksPage from "./pages/WorksPage/WorksPage";
import FAQPage from "./pages/FAQPage/FAQPage";
import SurvaysPage from "./pages/SurveysPage/SurveysPage";
import StatisticPage from "./pages/StatisticPage/StatisticPage";
import MapPage from "./pages/MapPage/MapPage";
import NoAccess from "./components/NoAccess/NoAccess";
import EmployeeSurveysPage from "./pages/EmployeeSurveysPage/EmployeeSurveysPage";
import EmployeeRequestsPage from "./pages/EmployeeRequestsPage/EmployeeRequestsPage";

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <Routes>
      <Route path={routes.home} element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path={routes.profile} element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute roles={["user", "employee", "admin"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path={routes.settings} element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute roles={["user", "employee", "admin"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path={routes.myRequests} element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute roles={["user"]}>
              <MyRequestsPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path={routes.works} element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute roles={["user"]}>
              <WorksPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path={routes.news} element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute roles={["user"]}>
              <SurvaysPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path={routes.surveys} element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute roles={["employee"]}>
              <EmployeeSurveysPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path={routes.requests} element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute roles={["employee"]}>
              <EmployeeRequestsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path={routes.terms} element={<Layout />}>
        <Route index element={<UserTermsPage />} />
      </Route>
      <Route path={routes.privacy} element={<Layout />}>
        <Route index element={<PrivacyPolicyPage />} />
      </Route>
      <Route path={routes.cookies} element={<Layout />}>
        <Route index element={<CookiesPolicyPage />} />
      </Route>
      <Route path={routes.statistic} element={<Layout />}>
        <Route index element={<StatisticPage />} />
      </Route>
      <Route path={routes.map} element={<Layout />}>
        <Route index element={<MapPage />} />
      </Route>
      <Route path={routes.faq} element={<Layout />}>
        <Route index element={<FAQPage />} />
      </Route>

      <Route path={routes.news} element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <SurvaysPage roles={["employee"]} />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
      <Route path={routes.notFound} element={<NotFound />} />
      <Route path={routes.noAccess} element={<NoAccess />} />
    </Routes>
  );
}

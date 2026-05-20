import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import EmployeeStatisticPage from "./pages/EmployeeStatisticPage/EmployeeStatisticPage";
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage";
import AdminDatabasePage from "./pages/AdminDatabasePage/AdminDatabasePage";
import AdminComplaintsPage from "./pages/AdminComplaintsPage/AdminComplaintsPage";
import AdminCommentsModerationPage from "./pages/AdminCommentsModerationPage/AdminCommentsModerationPage";
import ChatsPage from "./pages/ChatsPage/ChatsPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import CompanyListPage from "./pages/CompanyListPage/CompanyListPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage/CompanyDetailsPage";
import SurveysDetailsPage from "./pages/SurveysDetailsPage/SurveysDetailsPage";
import AddCompanyPage from "./pages/AddCompanyPage/AddCompanyPage";
import CompaniesDataPage from "./pages/CompaniesDataPage/CompaniesDataPage";
import UsersDataPage from "./pages/UsersDataPage/UsersDataPage";
import RequestsDataPage from "./pages/RequestsDataPage/RequestsDataPage";
import AddressesDataPage from "./pages/AddressesDataPage/AddressesDataPage";
import CreateRequestPage from "./pages/CreateRequestPage/CreateRequestPage";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";
import ResetPassword from "./features/login/ResetPassword/ResetPassword";
import ForgotPassword from "./features/login/ForgotPassword/ForgotPassword";

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  window.__TANSTACK_QUERY_CLIENT__ = queryClient;

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/*Resident*/}
        <Route path={routes.myRequests} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Resident"]}>
                <MyRequestsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.createRequest} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Resident"]}>
                <CreateRequestPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.works} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Resident"]}>
                <WorksPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.news} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Resident"]}>
                <SurvaysPage />
              </ProtectedRoute>
            }
          />
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
              <ProtectedRoute roles={["Resident"]}>
                <SurvaysPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.chat} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Resident", "Employee"]}>
                <ChatsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={`${routes.chat}/:chatId`} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Resident", "Employee"]}>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={`${routes.companies}/:companyId`} element={<Layout />}>
          <Route index element={<CompanyDetailsPage />} />
        </Route>
        <Route path={routes.companies} element={<Layout />}>
          <Route index element={<CompanyListPage />} />
        </Route>
        <Route path={`${routes.news}/:surveyId`} element={<Layout />}>
          <Route index element={<SurveysDetailsPage />} />
        </Route>

        {/*Employee*/}
        <Route path={routes.requests} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Employee"]}>
                <EmployeeRequestsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.surveys} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Employee"]}>
                <EmployeeSurveysPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.statistics} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Employee"]}>
                <EmployeeStatisticPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/*Admin*/}
        <Route path={routes["addresses-data"]} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AddressesDataPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes["requests-data"]} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <RequestsDataPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes["companies-data"]} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <CompaniesDataPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes["users-data"]} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <UsersDataPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.addHmo} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AddCompanyPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.adminDashboard} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.databases} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminDatabasePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.complaints} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminComplaintsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.hmoStat} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <EmployeeStatisticPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.comments} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminCommentsModerationPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/*Common*/}
        <Route path={routes.profile} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Resident", "Employee", "Admin"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.settings} element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["Resident", "Employee", "Admin"]}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.changePassword} element={<ChangePasswordPage />} />
        <Route path={routes.notFound} element={<NotFound />} />
        <Route path={routes.noAccess} element={<NoAccess />} />

        {/*Docs*/}
        <Route path={routes.terms} element={<Layout />}>
          <Route index element={<UserTermsPage />} />
        </Route>
        <Route path={routes.privacy} element={<Layout />}>
          <Route index element={<PrivacyPolicyPage />} />
        </Route>
        <Route path={routes.cookies} element={<Layout />}>
          <Route index element={<CookiesPolicyPage />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </QueryClientProvider>
  );
}

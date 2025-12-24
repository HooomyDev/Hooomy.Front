import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./features/route/ProtectedRouter/ProtectedRouter";
import "./styles/variables.css";
import "./styles/global.css";
import NotFound from "./components/NotFound/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/profile" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

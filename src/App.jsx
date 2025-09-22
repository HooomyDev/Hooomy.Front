import React from 'react';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './styles/variables.css';
import './styles/global.css';

export default function App() {
    return (
      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path="/home" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
      </Routes>
      );
}
import React from 'react';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      );
}
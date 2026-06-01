import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./features/locales/i18n";
import App from "./App";
import ScrollToTop from "./features/route/ScrollToTop/ScrollToTop";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDPN3k-6P5ORZb45hFeyOfYLKM4Tj9AqIY",
  authDomain: "hooome.firebaseapp.com",
  projectId: "hooome",
  storageBucket: "hooome.firebasestorage.app",
  messagingSenderId: "603893838208",
  appId: "1:603893838208:web:3c6f976f75f77528a09165",
};

initializeApp(firebaseConfig);
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
);

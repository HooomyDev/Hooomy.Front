import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./LandingHeader.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function LandingHeader() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className={styles.header}>
      <div
        className={styles.logo}
        onClick={scrollToTop}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="logo" />
      </div>

      <Navbar />

      <Link to="/register" className={styles.tryButton}>
        Попробовать
      </Link>
    </header>
  );
}

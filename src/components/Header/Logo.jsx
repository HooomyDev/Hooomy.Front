import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Logo() {
  return (
    <Link to="/" className={styles.logoWrapper} aria-label="На главную">
      <img
        src="/images/svg/logo.svg"
        alt="Логотип"
        className={styles.logoImage}
      />
    </Link>
  );
}
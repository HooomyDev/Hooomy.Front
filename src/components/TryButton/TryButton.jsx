import React from "react";
import styles from "./TryButton.module.css";
import { NavLink } from "react-router-dom";

export default function TryButton() {
  return (
    <NavLink to="/register" className={styles.tryButton}>
      Попробовать
    </NavLink>
  );
}
